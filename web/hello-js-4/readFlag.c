#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
	char ch;
	char key[]= "\xa5\x9c\xf6g\xda \xc9\xfb\xed\x7f\x9d-\xfd";
	FILE *f = fopen("./flag.txt", "rb");
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
