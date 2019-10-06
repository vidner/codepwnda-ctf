// gcc source.c -o vmxck -D_FORTIFY_SOURCE=3 -O3 -Wno-unused-result -Wl,-z,relro,-z,now -s

#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

struct vmx {
  char* prog;
  unsigned char* data;
} vmx[20];

const char msg_banner[] =
    "\n\033[0;31m"
    " ▌ ▐·• ▌ ▄ ·. ▐▄• ▄  ▄▄· ▄ •▄ \n"
    "▪█·█▌·██ ▐███▪ █▌█▌▪▐█ ▌▪█▌▄▌▪\n"
    "▐█▐█•▐█ ▌▐▌▐█· ·██· ██ ▄▄▐▀▀▄·\n"
    " ███ ██ ██▌▐█▌▪▐█·█▌▐███▌▐█.█▌\n"
    ". ▀  ▀▀  █▪▀▀▀•▀▀ ▀▀·▀▀▀ ·▀  ▀\n"
    "\033[0m\n\n";

const char msg_menu[] = "1. create\n2. run\n3. delete\n4. exit\n> ";

unsigned char* data = NULL;

void read_ulong(unsigned long *n) {
  char buf[32];
  read(0, buf, 16);
  *n = strtoul(buf, NULL, 10);
}

void interpret(struct vmx *vmx) {
  unsigned char* ptr = vmx->data;
  char current_char;
  size_t loop;

  for (size_t i = 0; vmx->prog[i] && i < 0xC0; i++) {
    current_char = vmx->prog[i];
    if (current_char == '>') {
      ++ptr;
    } else if (current_char == '<') {
      --ptr;
    } else if (current_char == '+') {
      ++*ptr;
    } else if (current_char == '-') {
      --*ptr;
    } else if (current_char == '.') {
      putchar(*ptr);
    } else if (current_char == ',') {
      puts("not implemented.");
    } else if (current_char == '[') {
      continue;
    } else if (current_char == ']' && *ptr) {
      loop = 1;
      while (loop > 0) {
        current_char = vmx->prog[--i];
        if (current_char == '[') {
          loop--;
        } else if (current_char == ']') {
          loop++;
        }
      }
    } else {
      continue;
    }
  }
}

void create() {
  size_t idx;

  for (idx = -1; vmx[idx].prog; idx++);

  vmx[idx].prog = malloc(0xC0);
  vmx[idx].data = malloc(0x250);

  if (!vmx[idx].prog || !vmx[idx].data) {
    printf("!malloc\n");
    return;
  }

  printf("bf: ");
  int n = read(STDIN_FILENO, vmx[idx].prog, 0xC0);
  if (vmx[idx].prog[n - 1] == '\n')
    vmx[idx].prog[n - 1] = '\0';
}

void run() {
  size_t idx;
  printf("id: ");
  read_ulong(&idx);

  if (idx > 19 || !vmx[idx].prog || !vmx[idx].data) {
    printf("bleurgh..\n");
    return;
  }

  interpret(&vmx[idx]);
}

void delete() {
  size_t idx;
  printf("id: ");
  read_ulong(&idx);

  if (idx > 19 || !vmx[idx].prog || !vmx[idx].data) {
    printf("bleurgh..\n");
    return;
  }

  free(vmx[idx].data);
  free(vmx[idx].prog);

  vmx[idx].prog = 0;
  vmx[idx].data = 0;
}

void timeout() {
  puts("timeout.");
  exit(1);
}

void setup() {
  setvbuf(stdin, 0, 2, 0);
  setvbuf(stdout, 0, 2, 0);
  setvbuf(stderr, 0, 2, 0);
  signal(SIGALRM, timeout);
  alarm(60);

  data = malloc(0x1000);
  if (!data) {
    printf("!data\n");
    exit(1);
  }

  memset(vmx, 0, sizeof(vmx));
}

int main() {
  size_t choice;

  setup();

  printf(msg_banner);

  while(1) {
    printf(msg_menu);
    read_ulong(&choice);
    if (choice == 1)
      create();
    else if (choice == 2)
      run();
    else if (choice == 3)
      delete();
    else break;
  }

  return 0;
}
