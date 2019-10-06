#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

struct linked_list{
	char buf[64];
	struct linked_list* next;
};

typedef struct linked_list linked_list;

linked_list *ll = NULL; 

linked_list* create(linked_list* ll){
	if(ll == NULL){
		ll = malloc(sizeof(linked_list));
		ll->next = NULL;
	}else{
		linked_list *helper = ll;
		while(helper->next != NULL)
			helper = helper->next;
		linked_list *new_ll = malloc(sizeof(linked_list));
		new_ll->next = NULL;
		helper->next = new_ll;
	}
	return ll;
}

void lread(linked_list* ll, unsigned idx){
	if(ll == NULL){
		puts("List empty.");
		return;
	}
	linked_list *helper = ll;
	while(idx--){
		if(helper->next == NULL){
			puts("Index out of bound.");
			return;
		}
		helper = helper->next;
	}
	printf("content: ");
	puts(helper);
}

void lwrite(linked_list* ll, unsigned idx){
	if(ll == NULL){
		puts("List empty.");
		return;
	}
	linked_list *helper = ll;
	while(idx--){
		if(helper->next == NULL){
			puts("Index out of bound.");
			return;
		}
		helper = helper->next;
	}
	printf("Your input: ");
	getchar();
	fgets(helper->buf, 70, stdin);
}
linked_list* delete(linked_list* ll, unsigned idx){
	if(ll == NULL){
		puts("List empty.");
		return ll;
	}
	if(idx == 0){
		free(ll);
		return NULL;
	}
	linked_list *prev = ll;
	linked_list *helper = ll->next;
	int i;
	for(i = 0; i < idx-1; i++){
		prev = helper;
		helper = helper->next;
	}
	prev->next = helper->next;
	helper->next = NULL;
	free(helper->next);

	return ll;
}

void info(){
	puts("1. Create");
	puts("2. Read");
	puts("3. Write");
	puts("4. Delete");
	puts("5. Exit");
	printf("> ");
}

int main(){
	setvbuf(stdin, 0, 2, 0);
  	setvbuf(stdout, 0, 2, 0);
  	char rd[8];
	int cmd, size=0, idx;
	while(1){
		info();
		read(0, &rd, 8);
		cmd = atoi(rd);
		switch(cmd){
			case 1:
				if(size > 40){
					puts("memory limit.");
					break;
				}
				ll = create(ll);
				size++;
				break;
			case 2:
				printf("index: ");
				scanf("%d", &idx);
				lread(ll, idx);
				break;
			case 3:
				printf("index: ");
				scanf("%d", &idx);
				lwrite(ll, idx);
				break;
			case 4:
				if(size == 0){
					puts("empty list.");
					break;
				}
				printf("index: ");
				scanf("%d", &idx);
				ll = delete(ll, idx);
				size--;
				break;
			default:
				puts("exiting.");
				return 0;

		}
	}
	return 0;
}