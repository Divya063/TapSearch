# TapSearch

Objectives :

1. It takes in multiple paragraphs of text, assigns a unique ID To each paragraph and stores the words to paragraph mappings on an inverted index. This is similar to what elasticsearch does. This paragraph can also be referred to as a ‘document’

2. Given a word to search for, it lists out the top 10 paragraphs in which the word is present.

3. Files can also be uploaded (Only Text and PDF files)

<hr>

## Setup Instructions

```bash
git clone https://github.com/Divya063/TapSearch.git
cd TapSearch
pip3 install -r requirements.txt
python3 main.py
```

## Screenshot

1. Create Index

![Alt text](https://github.com/Divya063/TapSearch/blob/master/Screenshots/Screenshot%202019-11-28%20at%208.57.47%20AM.png)

2. Search

![Alt text](https://github.com/Divya063/TapSearch/blob/master/Screenshots/Screenshot%202019-11-28%20at%208.58.29%20AM.png)

3. Clear Indexes

![Alt text](https://github.com/Divya063/TapSearch/blob/master/Screenshots/Screenshot%202019-11-28%20at%208.58.53%20AM.png)

4. Upload file(s)

![Alt text](https://github.com/Divya063/TapSearch/blob/master/Screenshots/Screenshot%202019-11-28%20at%208.59.38%20AM.png)

## Test Cases

- Text
  
  ```
  # Input - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus. Elit duis tristique sollicitudin nibh sit amet commodo. Senectus et netus et malesuada fames. Fermentum iaculis eu non diam phasellus vestibulum lorem sed. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Aliquam ut porttitor leo a diam sollicitudin tempor. Consectetur a erat nam at lectus urna duis convallis. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. 
  
  Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis. Tellus rutrum tellus pellentesque eu tincidunt. Euismod quis viverra nibh cras pulvinar mattis. Proin nibh nisl condimentum id venenatis a. Quam elementum pulvinar etiam non quam. Arcu dictum varius duis at consectetur lorem donec. Aliquet porttitor lacus luctus accumsan tortor. Duis ut diam quam nulla porttitor massa id.

  # Query - Lorem

  # Result - Paragraph 1 and 2 are returned
  
  # Query - Maecenas
 
  # Result - Paragraph 2 returned
  
  
- File

  Test File - [text.pdf](https://github.com/Divya063/TapSearch/blob/master/test.pdf)(Contains duplicates)
  
  ```
  # Input - text.pdf
  
  # Query - https://github.com/Divya063/TapSearch/blob/master/test.pdf
  
  # Result - 
  
  The minimum geometry appears throughout the bell. The tunnel exports a wolf. A murderer loses on top of a native! The feminist idiot coasts without the sixth evidence.

  The minimum geometry appears throughout the bell. The tunnel exports a wolf. A murderer loses on top of a native! The feminist idiot coasts without the sixth evidence.


