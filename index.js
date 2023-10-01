
function jaccardSimilarity(set1, set2) {
    
    first = set1.replace(/\s+/g, '')
	second = set2.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}


function filterData(itemList,sortingOrder,itemsToBeRendered){
  itemList.forEach(item => {
    item.averageSimilarityScale = calculateAverageSimilarity(item);
  });

  if(sortingOrder===1){
    itemList.sort((a, b) => b.averageSimilarityScale - a.averageSimilarityScale);
  }else if(sortingOrder===0){
    itemList.sort((a, b) => a.averageSimilarityScale - b.averageSimilarityScale);
  }

  return (itemsToBeRendered || itemsToBeRendered===0)  ? itemList?.slice(0,itemsToBeRendered) : itemList

}


function getSimilarityScaleofArrayOfObjects({data=[],rawText='',objectMatchingKeys=[],sortingOrder,itemsToBeRendered}){

    const similarities = findSimilarlity(data,rawText,objectMatchingKeys)
  
    return filterData(similarities,sortingOrder,itemsToBeRendered)

}

function getSimilarityofArrayOfObjects({data=[],similarityScale=0,rawText='',objectMatchingKeys=[],sortingOrder,itemsToBeRendered,callback}){
  
  

    const similarities = findSimilarlity(data,rawText,objectMatchingKeys)
    const similaritiesItem = similarities.filter(result => [true].includes(objectMatchingKeys.some(oe=>result.similarityScale[oe] >= similarityScale))||false);

      var itemList = [...similaritiesItem] , bestMatchIndex = 0;
      itemList =  filterData(itemList,sortingOrder,itemsToBeRendered)
      const  itemListwithoutCount =  filterData(similaritiesItem)

     itemListwithoutCount.forEach((e,i)=>{
        if (e.averageSimilarityScale > itemListwithoutCount[bestMatchIndex].averageSimilarityScale) {
          bestMatchIndex = i
        }
      })

      callback && callback({bestMatch:itemListwithoutCount[bestMatchIndex],bestMatchIndex})
      return  filterData(similaritiesItem,sortingOrder,itemsToBeRendered)
}

function calculateAverageSimilarity(item) {
    let sum = 0;
    let count = 0;
  
    for (const key in item.similarityScale) {
      if (item.similarityScale.hasOwnProperty(key)) {
        sum += item.similarityScale[key];
        count++;
      }
    }
  
    return count === 0 ? 0 : sum / count;
  }


function findSimilarlity(data=[],rawText='',objectMatchingKeys=[]){

   return data.map((item) => {
        var similarity_item = {}
    
        objectMatchingKeys.forEach((e)=>{
            similarity_item[e] = jaccardSimilarity(rawText.toLowerCase(), item[e].toLowerCase());
        })
        return {item,similarityScale:similarity_item}
    
    })
}


function getSimilarityOfTwoString(string1,string2){
 return {similarityScale: jaccardSimilarity(string1.toLowerCase(), string2.toLowerCase())||0};
}

function getSimilarityOfArrayOfStrings({rawText='', data=[],sortingOrder,itemsToBeRendered,callback}) {
	const similarities = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < data.length; i++) {
		const currentTargetString = data[i];
		const currentRating = jaccardSimilarity(rawText, currentTargetString)
		similarities.push({targetString: currentTargetString, similarityScale: currentRating})
		if (currentRating > similarities[bestMatchIndex].similarityScale) {
			bestMatchIndex = i
		}
	}
	
	
	const bestMatch = similarities[bestMatchIndex]

  if(sortingOrder===1){
    similarities.sort((a, b) => b.similarityScale - a.similarityScale);
  }else if(sortingOrder===0){
    similarities.sort((a, b) => a.similarityScale - b.similarityScale);
  }
	callback && callback({bestMatch,bestMatchIndex})
	return  itemsToBeRendered ? similarities?.slice(0,itemsToBeRendered) : similarities
}


module.exports = {getSimilarityScaleofArrayOfObjects,getSimilarityofArrayOfObjects,getSimilarityOfTwoString,getSimilarityOfArrayOfStrings}










