// gcc -o back2basic back2basic.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int v = -1;
int w = 1;
int x = 0;
int addu[] = {1052, 787, 201, 666, 956, 1078, 681, 901, 1100};
int mulu[] = {1898, 2228, 681, 634, 337, 356, 273, 246, 2079};
int xumu[] = {69, 29, 126, 61, 9, 24, 64};
int rr1[] = {5, 3, 3, 5, 3, 3, 5, 2, 3};
int rr2[] = {2, 2, 2, 3, 2, 5, 2, 3, 5};
int rr3[] = {3, 5, 5, 2, 5, 2, 3, 5, 2};

void wrong() {
	printf("Wrong flag!\n");
	exit(0);
}

void hahaha() {
	v *= 2;
	if(!(w % 2))
		v *= -1;
	w += 1;
}

void hehehe(char *ans) {
	if(strlen(ans) == 28)
		x += v; 
	else
		wrong();
	int i;	
	for(i=0; i<strlen(ans)/3; i++) {
		hahaha();
		if((rr1[i]*ans[i]) + (rr2[i]*ans[i+9]) + (rr3[i]*ans[i+18]) == addu[i])
			x += v;
	}
	for(i=0; i<strlen(ans)/3; i++) {
		hahaha();
		if((rr1[i]+ans[i]) * (rr2[i]+ans[i+9]) * (rr3[i]+ans[i+18]) % 2273 == mulu[i])
			x += v;
	}
	for(i=0; i<strlen(ans)/4; i++) {
		if((ans[i] ^ ans[i+7] ^ ans[i+14] ^ ans[i+21]) != xumu[i])
			wrong();
	}
}

int sumu(char *ans) {
	int i, y = 0;
	for(i=0; i<strlen(ans); i++)
		y += ans[i];
	return y;
}

int main() {
	char ans[28];
	printf("Check your flag here: ");
	scanf("%s", ans);
	hehehe(ans);
	if(x == 170385 && sumu(ans) == 2590)
		printf("Good job, bro!\ncodepwnda{%s}\n", ans);
	else
		wrong();
	return 0;
}