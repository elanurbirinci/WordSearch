// Oyun tahtasının varsayılan durumu.
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
];

// Kelime setini oluşturan fonksiyon.
export const generateWordSet = async () => {
  try {
    // 'words.txt' dosyasını içeri aktararak fetch işlemi gerçekleştirilir.
    const response = await fetch(new URL('./words.txt', import.meta.url).toString());
    const result = await response.text();
    const wordArr = result.split("\n").map(word => word.trim()); // Her kelimenin başındaki ve sonundaki boşlukları temizle
    const wordSet = new Set(wordArr);// Diziyi Set'e dönüştürerek benzersiz kelimeleri içeren bir küme elde eder.
    console.log('Word Set:', wordSet);
    return { wordSet };
  } catch (error) {
    console.error('Error processing wordlist:', error);
    throw error;
  }
}




