#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
	char ch;
	char key[]= "!@#KWEDA12z";
	FILE *f = fopen("./flag.txt", "r");
	int i = 0;
	printf("codepwnda{");
	while((ch = fgetc(f)) != EOF){
      printf("%c", ch^key[i%strlen(key)]);
      i++;
	}
	printf("}\n");
  	fclose(f);
	return 0;
}