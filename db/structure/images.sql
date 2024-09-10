-- Reset the images table and the auto-increment counter
DELETE FROM images;
DELETE FROM sqlite_sequence WHERE name='images';

-- Re-insert fresh data into the images table, using updated context_id from pericopes
INSERT INTO images (context_id, context_type, type, path, alt_text) VALUES
(1, 'pericope', 'url', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Carl_Heinrich_Bloch_-_The_Annunciation.jpg', 'La Anunciación de Carl Heinrich Bloch representando el Prólogo'),
(5, 'pericope', 'url', 'https://achristianpilgrim.wordpress.com/wp-content/uploads/2010/08/filipus-mengajak-nataniel-untuk-bertemu-dengan-yesus.jpg', 'Jesús llama a Felipe y a Natanael'),
(6, 'pericope', 'url', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/CarlBloch_weddingatCana.jpg/640px-CarlBloch_weddingatCana.jpg', 'Las bodas de Caná por Carl Heinrich Bloch'),
(7, 'pericope', 'url', 'https://m.media-amazon.com/images/I/71V4-AFAivL._AC_UF894,1000_QL80_.jpg', 'Jesús purifica el templo'),
(11, 'pericope', 'url', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Carl_Heinrich_Bloch_-_Woman_at_the_Well.jpg/800px-Carl_Heinrich_Bloch_-_Woman_at_the_Well.jpg', 'Jesús y la mujer samaritana'),
(26, 'pericope', 'url', 'https://i.redd.it/kwbz58h5k9rb1.jpg', 'Jesús y la mujer adúltera'),
(31, 'pericope', 'url', 'https://upload.wikimedia.org/wikipedia/commons/2/25/Healing_of_the_Blind_Man_by_Jesus_Christ.jpg', 'Jesús sana a un ciego de nacimiento'),
(39, 'pericope', 'url', 'https://upload.wikimedia.org/wikipedia/commons/6/6d/RaisingofLazarusBloch.jpg', 'Jesús resucita a Lázaro'),
(58, 'pericope', 'url', 'https://api.brushwiz.com/images/paintings/t/The_Guards_Falling_Backwards_by_James_Jacques_Joseph_Tissot_F62.jpg', 'James J. Tissot, The guards falling backwards (1884-1896), gouache on grey wove paper, 7-13/16 x 10-3/8 in, brooklyn museum, new york.'),
(63, 'pericope', 'url', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Christ_at_the_Cross_-_Cristo_en_la_Cruz.jpg/197px-Christ_at_the_Cross_-_Cristo_en_la_Cruz.jpg', 'Cristo en la cruz'),
(64, 'pericope', 'url', 'https://w0.peakpx.com/wallpaper/151/716/HD-wallpaper-the-burial-of-christ-art-bloch-old-master-beautiful-illustration-artwork-jesus-christ-painting-wide-screen-portrait-carl-heinrich-bloch-burial.jpg', 'El entierro de Cristo por Carl Heinrich Bloch');
