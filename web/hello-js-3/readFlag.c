#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
	char ch;
	char key[]= ":L@K!#$!~";
	FILE *f = fopen("./flag.txt", "r");
	int i = 0;
	while((ch = fgetc(f)) != EOF){
      printf("%c", ch^key[i%strlen(key)]);
      i++;
	}
  	fclose(f);
	return 0;
}