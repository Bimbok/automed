#include <stdio.h>

int main() {
    char text[1000];  // Buffer for text input
    char pattern[100];  // Buffer for pattern input
    
    printf("Enter the text string: ");
    scanf("%999s", text);  // Read up to 999 characters to prevent buffer overflow
    
    printf("Enter the pattern to search: ");
    scanf("%99s", pattern);  // Read up to 99 characters to prevent buffer overflow
    
    KMPSearch(text, pattern);

    return 0;
} 