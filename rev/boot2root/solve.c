#include <stdio.h>

unsigned long seed = 1;
unsigned char flag[] = "b00tyrom_exploit_w3n_ET4";
unsigned long h[6] = {0};

void _srand(unsigned long next) { seed = next; }

unsigned long _rand_next(unsigned long* seed) {
  *seed = *seed * 1103515245 + 12345;
  return *seed & 0xFFFFFFFFFFFFFFFF;
}

unsigned long _rand(void) { return _rand_next(&seed); }

unsigned long hash(unsigned long c) {
  unsigned long ret = 1;
  _srand(c);

  while (c) {
    ret = (ret * _rand()) & 0xFFFFFFFFFFFFFFFF;
    c >>= 8;
  }

  return ret;
}

int main(int argc, char const *argv[]) {
  unsigned long i, c = 0;

  for (i = 0; i < 24; i += 4)
    h[c++] = hash(*(unsigned int*)(flag + i));

  for (c = 0; c < 6; ++c) {
    // printf("%p\n", h[c]);
    for (i = 0; i < 0xFFFFFFFF; ++i) {
      if (hash(i) == h[c]) {
        printf("found %ld, %lx, %lx\n", c, i, hash(i));
        // prlongf("found %x, %c%c%c%c", i, i, i >> 8, i >> 16, i >> 24);
        break;
      }
    }
  }

  return 0;
}