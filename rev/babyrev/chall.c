#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int   secured_array[75] = {41, 45, 73, 28, 75, 244, 184, 230, 164, 123, 123, 76, 71, 28, 245, 190, 182, 162, 122, 124, 29, 24, 75, 164, 189, 228, 160, 115, 40, 74, 78, 78, 201, 232, 236, 250, 56, 62, 26, 8, 26, 228, 208, 251, 234, 49, 45, 26, 33, 6, 228, 234, 244, 204, 50, 53, 29, 31, 30, 247, 238, 224};
int main(int argc, char const *argv[])
{
	int secure_key;
	int length,len;
	int i;
	char password[75];
	puts("insert password ! max 75 ");
	scanf("%75s",&password);
	puts("insert key ! 1-255");
	scanf("%d",&secure_key);
	length=strlen(password);
	len=strlen(argv[0]);
	if(length==62){
		for(i=0;i<length;i++){
			int j=i%len;
			int k=password[i]^secure_key+argv[0][j];
			if (secured_array[i]!=k){
				puts("Wrong !");
				return 0;
			}
		}
		printf("Selamat ini flag buat kamu , codepwnda{");
		for(i=length-1;i>=0;i--){
			printf("%c",password[i]);
			}
		puts("}");
	}else{
		puts("Wrong !");
	}
	return 0;
}
	
