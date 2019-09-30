#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>
#include <signal.h>

#define SIZE 20
#define Box box[i][j][k]
#define RANJAU 3000

// Avalaible slot 5832 - 2 (Hero dan Harta)
/**

compile cmd
gcc -o kudanil_lsi2 src/kudanil_lsi2.c
gcc -o kudanil_lsi2 kudanil_lsi2.c

**/


// struct

struct move
 {
 	int x;
 	int y;
 	int lev;
 }; 

typedef struct move move;

// x, y, lev
struct objek
{
	char head;
	int win;
	move pos;
	char name[64];
	int (*stat)();

};

struct node
{
	move po;
	int jarak;
};
typedef struct node node;
typedef struct objek objek;

// declare

move m_naik = {0, 0, 1};	
move m_turun = {0, 0, -1};	

move m_u = {0, -1, 0};
move m_d = {0, 1, 0};

move m_r = {1, 0, 0};
move m_l = {-1, 0, 0};

objek Hero;
objek Harta;

// 

int sisa_move;

float satuan, dalam;

char box[SIZE+1][SIZE+1][SIZE+1] = {}; 
int visited[SIZE+1][SIZE+1][SIZE+1] = {0};
// function

int print_stat(){
	
	printf("----------------\n");
	printf("Peta sungai lengkap\n");
	printf("----------------\n\n");
	printbox();
}

int init_hero(){

	Hero.pos.x = rand() % (SIZE - 2 + 1 - 1) + 1;
	Hero.pos.y = rand() % (SIZE - 2 + 1 - 1) + 1;
	Harta.head = 'H';
	Hero.pos.lev = 1;
	Harta.pos.x = rand() % (SIZE - 2 + 1 - 1) + 1;
	Harta.pos.y = rand() % (SIZE - 2 + 1 - 1) + 1;
	Harta.pos.lev = SIZE-2;
	printf("Isilah nama heromu\n> ");
	Hero.stat = print_stat;
	fgets(Hero.name, 64 + 4 + 9, stdin);
	Hero.head = Hero.name[0];
	box[Harta.pos.lev][Harta.pos.y][Harta.pos.x] = Harta.head;
	box[Hero.pos.lev][Hero.pos.y][Hero.pos.x] = Hero.head;

}

int header(){
	printf("\xa\x20\x20\x2e\x2d\x27\x27\x27\x27\x2d\x2e\x20\x5f\x20\x20\x20\x20\xa\x20\x28\x27\x20\x20\x20\x20\x27\x20\x20\x27\x30\x29\x2d\x2f\x29\xa\x20\x27\x2e\x2e\x5f\x5f\x5f\x5f\x2e\x2e\x3a\x20\x20\x20\x20\x5c\x2e\x5f\xa\x20\x20\x20\x5c\x75\x20\x20\x75\x20\x28\x20\x20\x20\x20\x20\x20\x20\x20\x27\x2d\x2e\x2e\x2d\x2d\x2d\x2d\x2d\x2d\x2e\x5f\xa\x20\x20\x20\x7c\x20\x20\x20\x20\x20\x2f\x20\x20\x20\x20\x20\x20\x3a\x20\x20\x20\x27\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x27\x2d\x2d\x2e\xa\x20\x20\x2e\x6e\x6e\x5f\x6e\x6e\x2f\x20\x28\x20\x20\x20\x20\x20\x20\x3a\x20\x20\x20\x27\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x27\x5c\xa\x20\x28\x20\x27\x27\x20\x27\x27\x20\x2f\x20\x20\x20\x20\x20\x20\x3b\x20\x20\x20\x20\x20\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x5c\xa\x20\x20\x27\x27\x2d\x2d\x2d\x2d\x27\x20\x22\x5c\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x3a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x3a\x20\x27\x2e\xa\x20\x20\x20\x20\x20\x20\x20\x20\x20\x2e\x27\x2f\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x27\x2e\xa\x20\x20\x20\x20\x20\x20\x20\x20\x2f\x20\x2f\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x27\x2e\xa\x20\x20\x20\x20\x20\x20\x20\x2f\x5f\x7c\x20\x20\x20\x20\x20\x20\x20\x29\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x2e\x5c\x7c\xa\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7c\x20\x20\x20\x20\x20\x20\x2f\x5c\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x2e\x20\x27\xa\x20\x20\x20\x20\x20\x20\x20\x20\x20\x27\x2d\x2d\x2e\x5f\x5f\x7c\x20\x20\x27\x2d\x2d\x2e\x5f\x20\x20\x2c\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x2f\xa\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x2f\x27\x2d\x2c\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x2e\x27\xa\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x2f\x20\x20\x20\x7c\x20\x20\x20\x20\x20\x20\x20\x20\x5f\x2e\x27\x20\xa\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x28\x5f\x5f\x5f\x5f\x5c\x20\x20\x20\x20\x20\x20\x20\x2f\x20\x20\x20\x20\xa\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x5c\x20\x20\x20\x20\x20\x20\x5c\x20\x20\x20\xa\xa\n");	
	
}

void loading(){
	
	int i;
	for (i = 0; i < 3; ++i)
	{
		printf(".");
		sleep(1);
	}
	printf("\n");
}

void handler(){
	printf("Waktu habis\n");
	loading();
	sleep(1);
	printf("KEHABISAN NAFAS\n");
	sleep(1);
	printf("Whahahaha\n");
	exit(0);
}

int Init(){
	srand(time(NULL));
	setvbuf(stdout, NULL, _IONBF, 0);
	printf("Dramaga Game Studios Present\n");
	loading();
	puts("------------------");
	puts("Kudanil LSI V2.0.");
	puts("------------------");
	
	header();
	printf("Cari dan berpetualang. Cari kudanil misterius yang terdapat di danau LSI\n");
	puts("\nWelcome folks. Miss me.\n\n");
	puts("New Feature");
	puts("--------------------------");
	puts("- Kini kamu dapat menyelam sungai untuk mencari harta yang dinginkan.\n\n");
	// debugging

}

int fillbox(){
	//lev
	for (int i = 0; i < SIZE; ++i)
	{
		//y
		for (int j = 0; j < SIZE; ++j)
		{
			//x
			for (int k = 0; k < SIZE; ++k)
			{
				visited[i][j][k] = 0;
				if(i == 0|| j  == 0|| k == 0 || i == SIZE-1 || j == SIZE-1 || k == SIZE-1)

					Box = '#';
				else if(
					Hero.pos.lev == i &&
					Hero.pos.y == j &&
					Hero.pos.x == k 
					)
				{					
					Box = Hero.head;
				}
				else if(
					Harta.pos.lev == i &&
					Harta.pos.y == j &&
					Harta.pos.x == k 
					)
				{					
					Box = Harta.head;
				}
					
				else 
					Box = '~';
			}
		}
	}

}

int printbox(){
	srand(time(NULL));

	//lev
	for (int i = 0; i < SIZE; ++i)
	{
		dalam =  i * 100 * 1.0 * satuan;
		printf("kedalaman %f m\n",dalam);
		if(dalam > 120 || i > 5 && 0){
		// if(0){
			printf("WARNING ~ Sungai terlalu dalam. Tidak dapat terlihat\n\n\n");
			break;	
		}
		else{
			//y
			for (int j = 0; j < SIZE; ++j)
			{
				printf("%s\n", box[i][j]);
			}
		}
			printf("\n\n\n");
		
	}

}

int cheat(char *pil){
	printf("Cheat code activated\n");
	int lev, y, x;
	char pilihan;
	printf("Apa yang akan kamu pilih\n");
	printf("[l] blue pil\n[r] red pil\n > ");
	scanf("%c", &pilihan);
	printf("> ");
	scanf("%d %d %d", &lev, &y, &x);
	getchar();
	if(pilihan == 'l')
		printf("Ini adalah isi dari box : \"%c\"\n", box[lev][y][x]);
	else if(pilihan == 'r')
		printf("Ini adalah isi dari box : \"%c\"\n", pil[lev * ((SIZE + 1) * (SIZE + 1)) + y * (SIZE + 1) + x]);

}

int prepare(){

	while(satuan < 0.2 || satuan > 0.7){
		satuan = (float)rand()/RAND_MAX;
	}
	fillbox();
	init_hero();
}

int help(){
	printf("Berikut adalah command untuk menggerakkan hero kamu\n");
	printf("[d] : Kekanan\n");
	printf("[a] : Kekiri\n");
	printf("[w] : Keatas\n");
	printf("[s] : Kebawa\n");
	printf("[v] : Menyelam\n");
	printf("[f] : Naik\n");
	printf("[q] : Status\n");

}

int introakad(){

	printf("\nEnter any key to start\n");
	char a = getchar();
	if(a != '\n')
		getchar();

}



int gerak(move baru){
	move temp;
	sisa_move--;
	temp = Hero.pos;
	temp.x 	 += baru.x;
	temp.y 	 += baru.y;
	temp.lev += baru.lev;
	if(box[temp.lev][temp.y][temp.x] == '#'){
		printf("Kamu termakan buaya putih...\n");
		exit(0);
	}
	else if(box[temp.lev][temp.y][temp.x] == 'H'){
		return 1;
	}
	else{
		box[temp.lev][temp.y][temp.x] = Hero.head;
		box[Hero.pos.lev][Hero.pos.y][Hero.pos.x] = '~';
		Hero.pos = temp;
	}
	return 0;
}


int statusbar(){
	printf("Koordinate player\t: \n");
	printf("x\t: %d\ny\t: %d\nlevel\t: %d\n", Hero.pos.x, Hero.pos.y, Hero.pos.lev);
	printf("----------------------\n");
	printf("Sisa langkah : %d\n", sisa_move);
	printf("----------------------\n");
	printf("Peta saat ini\n");
	printf("----------------------\n");
	dalam =  Hero.pos.lev * 100 * 1.0 * satuan;
	printf("* Kedalaman : %f m\n", dalam);
	printf("\n");
	// y
	for (int i = 0; i < SIZE; ++i)
	{
		printf("%s\n", box[Hero.pos.lev][i]);
	}
	printf("\n");

};


int play(){
	
	char pil;
	int A;
	char pesan[99];
	
	while(1){
		statusbar();
		A = 0;
		pil = getchar();
		getchar();
		if (sisa_move == 0){
			printf("Langkah mu habis\n");
			exit(0);
		}
		if     (pil == 'd') A = gerak(m_r);
		else if(pil == 'a') A = gerak(m_l);
		else if(pil == 'w') A = gerak(m_u);
		else if(pil == 's') A = gerak(m_d);
		else if(pil == 'v')	A = gerak(m_naik);
		else if(pil == 'f') A = gerak(m_turun);	
		else if(pil == 'q') Hero.stat(&pil);
		if(A == 1)
			break;

		// if(pil == 'm')
			// break;
	}
	printf("Selamat kamu telah menemukan harta karun\n");
	printf("Ingin memberikan selamat kepada player lain?\n");
	gets(pesan);

}

int cari_pendek(){


}

int acak(int mine){
	move temp_pos;

	for (int i = 0; i < mine; )
	{
		temp_pos.lev = random() % (SIZE);
		temp_pos.y   = random() % (SIZE);
		temp_pos.x   = random() % (SIZE);
		if(box[temp_pos.lev][temp_pos.y][temp_pos.x] != Hero.head &&
		   box[temp_pos.lev][temp_pos.y][temp_pos.x] != 'H' &&
		   box[temp_pos.lev][temp_pos.y][temp_pos.x] != '#' 
			){
			box[temp_pos.lev][temp_pos.y][temp_pos.x] = '#';
			i ++;
			}
	}

}

int antrix[20 * 20 * 20 * 100];
int antriy[20 * 20 * 20 * 100];
int antrilev[20 * 20 * 20* 100];
int jarak[20 * 20 * 20* 100];
int size   = 0;
int kepala = 0;
int buntut = 0;

int push(int lev, int y, int x, int jar){
	antrilev[kepala] = lev;
	antrix[kepala] = x;
	antriy[kepala] = y;
	jarak[kepala] = jar;
	kepala ++;
	size ++;
}

int pop(){
	int i;
	buntut ++;
	size--;
}


int frontx(){
	return antrix[buntut];	
}

int fronty(){
	return antriy[buntut];
}

int frontlev(){
	return antrilev[buntut];
}

int jaraks(){
	return jarak[buntut];
}

int solver(){
	size   = 0;
	kepala = 0;
	buntut = 0;
	push(Hero.pos.lev, Hero.pos.y, Hero.pos.x, 0);	
	int m, n, o, a, b, c, distance;
	int new = 1;
	

	m = Harta.pos.lev;
	n = Harta.pos.y;
	o = Harta.pos.x;
	// printf("start %d %d %d\n", Hero.pos.lev, Hero.pos.y, Hero.pos.x);
	// printf("finish %d %d %d\n", m, n, o);
	while(size){

		a = frontlev();
		b = fronty();
		c = frontx();
		// printf("%d %d %d %d \n", a, b, c, size);		
		// sleep(1);
		distance = jaraks();
		pop();
		if(visited[a][b][c] == 1  || (box[a][b][c] == '#'  && box[a][b][c] !=  Hero.head &&  box[a][b][c] != 'H' )) {			
			// printf("%c Jajaja\n", box[a][b][c]);
			continue;
		};

		visited[a][b][c] = 1;
		if (a==m && b==n && c ==o)
	       {
	       	   // printf("FOUND\n");
	       	   return distance+1;
	           break;
	       }
	   	push(a+1, b, c, distance + 1);
		push(a, b+1, c, distance + 1);
		push(a-1, b, c, distance + 1);
		push(a, b-1, c, distance + 1);
		push(a, b-1, c+1, distance + 1);
		push(a, b-1, c-1, distance + 1);
	}
	return 0;
}


/**/

int a = 0;
int main(int argc, char const *argv[])
{
	Init();
	prepare();
	introakad();

	for (int i = 0; ; ++i)
	{
		acak(RANJAU);
		sisa_move = solver();
		printf("%d %d\n", i, sisa_move);	
		if (sisa_move != 0)
			break;
		fillbox();

	}

	alarm(10);
	signal(SIGALRM, handler);
	if(a != 0) exit(0);
	a = 1;
	
	play();
	return 0;
}