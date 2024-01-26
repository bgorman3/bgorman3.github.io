const albums = [
    {
      id: 2125,
      title: 'Use Your Illusion',
      artist: "Guns N' Roses"
    },
    {
      id: 1678,
      title: 'A Night at the Opera',
      artist: 'Queen'
    },
    {
      id: 2975,
      title: '1999',
      artist: 'Prince'
    },
    {
      id: 3257,
      title: 'Space Oddity',
      artist: 'David Bowie'
    }
  ];
  
  // Return an album that matches the id
  function findById(id) {
    return albums.find(album => album.id === id);
  }
  
  // Implement save(album)
  function save(album) {
    albums.push(album);
  }
  
  // Implement findByArtist(artist)
  function findByArtist(artist) {
    return albums.filter(album => album.artist === artist);
  }
  
  // Implement updateById(id, album)
  function updateById(id, updatedAlbum) {
    const index = albums.findIndex(album => album.id === id);
    if (index !== -1) {
      albums[index] = updatedAlbum;
      return true;
    }
    return false;
  }
  
  // Implement removeById(id)
  function removeById(id) {
    const index = albums.findIndex(album => album.id === id);
    if (index !== -1) {
      albums.splice(index, 1);
      return true;
    }
    return false;
  }
  
  // Uncomment the following testing code when you are ready to test your functions
  save({ id: 1458, title: "G N' R Lies", artist: "Guns N' Roses" });
  save({ id: 3590, title: "School's Out", artist: 'Alice Cooper' });
  save({ id: 1257, title: 'Transformer', artist: 'Lou Reed' });
  
  console.log(albums);
  console.log(findById(2975));
  console.log(findByArtist("Guns N' Roses"));
  console.log(removeById(4000));
  console.log(updateById(4000, {}));
  console.log(updateById(3257, { id: 3257, title: 'Space Oddity', artist: 'David Bowie' }));
  console.log(removeById(1678));
  console.log(albums);
  