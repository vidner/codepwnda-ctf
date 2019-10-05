#include <libpayload-config.h>
#include <libpayload.h>

extern struct console_output_driver* console_out;
extern struct sysinfo_t lib_sysinfo;

unsigned long long randr[] = {
  0xf7f169f1112243e0u,
  0xe823a9f65871b2b8u,
  0x6ced56586bf77388u,
  0x6bce0d6c0198f710u,
  0x53612155d6487788u,
  0x7e1b05e0e8f13388u
};

long unsigned long seed = 1;

void _srand(unsigned long long next) { seed = next; }

unsigned long long _rand_next(unsigned long long* seed) {
  *seed = *seed * 1103515245 + 12345;
  return *seed & 0xFFFFFFFFFFFFFFFF;
}

unsigned long long _rand(void) { return _rand_next(&seed); }

unsigned long long hash(unsigned long long c) {
  unsigned long long ret = 1;
  _srand(c);

  while (c) {
    ret = (ret * _rand()) & 0xFFFFFFFFFFFFFFFF;
    c >>= 8;
  }

  return ret;
}

int main(void) {
  char* password = malloc(32);
  char ch = 0;
  unsigned int i = 0, c = 0;

  printf("password: ");

  while (ch = getchar(), ch != '\n') {
    password[i++] = ch;
    if (i == 24) break;
  }

  for (i = 0; i < 24; i += 4)
    if (randr[c++] != hash(*(unsigned int*)(password + i)))
      goto die;

  puts("gratz");

die:
  halt();
  return 0;
}