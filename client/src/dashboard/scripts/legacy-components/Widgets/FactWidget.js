class FactWidget {
  constructor(options){
    this.container = options.element.append('div').attr('class', 'fact__inner');
    this.description = options.description || 'no fact available';
    this.init();
  }

  init(){
    this.container.append('p').text(this.description);
  }
}

module.exports = FactWidget;
