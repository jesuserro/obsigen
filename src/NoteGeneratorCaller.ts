<%* 
  // import { NoteGenerator } from "./NoteGenerator";
  // import { NoteGenerator } from tp.user.NoteGenerator;
  require("./NoteGenerator").NoteGenerator;
  // const { NoteGenerator } = require('./NoteGenerator').NoteGenerator;
  // const { NoteGenerator } = require('./NoteGenerator').NoteGenerator;

  const noteGenerator = new NoteGenerator("1985-05-11");
  (async function (generator) {
      //const promptDate = await tp.system.prompt("Enter the date (YYYY-MM-DD):");
      const generatedNote = await generator.generateNote();
      tp.file.create_new(generatedNote, generator.pathToFile, true);
      // return await noteGenerator.generateNote();
      // await noteGenerator.generateNote();
  })(noteGenerator);
-%>