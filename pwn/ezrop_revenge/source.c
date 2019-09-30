#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void vuln()
{
  char buf[8];
  
  write(1, "no view(), no surrender!\n", 25);
  read(0, buf, 0x1000);

  close(0);
  close(1);
  close(2);
}

int main(int argc, char const *argv[])
{
  vuln();
  return 0;
}
