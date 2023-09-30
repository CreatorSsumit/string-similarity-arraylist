# string-similarity-arraylist

Finds degree of similarity in list of array of objects , based on Dice's Coefficient, which is mostly better than Levenshtein distance.

## Installation

### For Node Js 

```bash
npm install string-similarity-arraylist --save
```

## Usage

```bash

const {

    getSimilarityofArrayOfObjects,
    getSimilarityScaleofArrayOfObjects
    getSimilarityOfArrayOfStrings,
    getSimilarityOfTwoString,
    
    } = require('string-similarity-arraylist')

```

or

```bash

import { 
    
    getSimilarityofArrayOfObjects ,
    getSimilarityScaleofArrayOfObjects ,
    getSimilarityOfArrayOfStrings,
    getSimilarityOfTwoString 
    
    } from 'string-similarity-arraylist'

```

### For browser apps

Include   ``<script src="//cdn.jsdelivr.net/npm/string-similarity-arraylist/index.min.js"></script>`` to get the latest version.

Or ``<script src="//cdn.jsdelivr.net/npm/string-similarity-arraylist@1.0.1/index.min.js"></script>`` to get a specific version (4.0.1) in this case.

##### This exposes a global variable called getSimilarityofArrayOfObjects , getSimilarityScaleofArrayOfObjects , getSimilarityOfArrayOfStrings , getSimilarityOfTwoString  which you can start using.

```bash

    <script>

     const data = getSimilarityofArrayOfObjects({

                             data: Array Of Objects,
                             rawText: String,
                             objectMatchingKeys: Array of Object key,
                             similarityScale: Scale of Similarity (0 - 1)
                             sortingOrder: default None ,
                             itemsToBeRendered: Number of Items Return,
                             callback: Return Best Match
            
                         });

      console.log(data)    // All Filtered Lists             

    </script>

```

## API

The package contains Four methods:


