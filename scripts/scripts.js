(function() {

  $(document).ready(function() {
    $("<div>")
      .addClass('gametable-space')
      .css({
        "width": "50%",
        "height": "100%",
        "display": "inline-block",
        "background": "rgba(0,255,0,0.4)"
      })
      .gametable()
      .appendTo('.gametable-spaces');  
    
    $("<div>")
    .addClass('gametable-space')
    .css({
      "width": "50%",
      "height": "100%",
      "display": "inline-block",
      "background": "rgba(255,128,0,0.4)"
    })
    .gametable()
    .appendTo('.gametable-spaces');  
    
    $('<div>')
      .gametableSpaceIcon({
        name: 'Shared Space', 
        image: 'http://farm5.staticflickr.com/4118/4857026160_be2146d4fa.jpg',
        selected: true
      })
      .appendTo($('.gametable-space-icons'));

    $('<div>')
      .gametableSpaceIcon({
        name: 'Board', 
        image: 'http://farm3.staticflickr.com/2625/3774896826_a9eb810112.jpg'
      })
      .appendTo($('.gametable-space-icons'));
    
    $('<div>')
      .gametableSpaceIcon({
        name: 'Enslaver of Humanity', 
        image: 'http://farm9.staticflickr.com/8037/8056870326_24befc3c2f.jpg'
      })
      .appendTo($('.gametable-space-icons'));

    $('<div>')
      .gametableSpaceIcon({
        name: 'Mr Monkey', 
        image: 'http://farm2.staticflickr.com/1233/4726132269_aa71fe7a4c.jpg'
      })
      .appendTo($('.gametable-space-icons'));
            
    $('<div>')
      .gametableItemAudio({
        label: 'Vivaldin Neljä vuodenaikaa'
      })
      .appendTo($('.gametable-material-item-group'));
    
    $('<div>')
      .gametableItemPdf({
        label: 'Aarniometsän Tanssivat ravut #8 - Karvaturrit banaaneja poimimassa'
      })
      .appendTo($('.gametable-material-item-group'));
    
    $('<div>')
      .gametableItemLink({
        link: 'http://www.google.com'
      })
      .appendTo($('.gametable-material-item-group'));
    
    $('<div>')
      .gametableItemDice({
        roll: '2d20+20'
      })
      .appendTo($('.gametable-dice-item-group'));
    
    $('<div>')
    .gametableItemDice({
      roll: 'd6'
    })
    .appendTo($('.gametable-dice-item-group'));
    
    $('<div>')
    .gametableItemDice({
      roll: 'd100 / 3'
    })
    .appendTo($('.gametable-dice-item-group'));
    
    $('<div>')
    .gametableItemDice({
      roll: 'd2+d2+d2'
    })
    .appendTo($('.gametable-dice-item-group'));
  });
  

}).call(this);
