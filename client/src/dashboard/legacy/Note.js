import d3 from 'd3';

/**
 * Each note has a title and content
 * click on the title toggles the content
 * the content is positioned always relative to the title
 * the content should not be bigger than the wrapper of the note
 * the content should always try to center relative to the title
 * the triangle on the content is always centered to the title
 */
let numberOfInstance = 0;
class Note {
  constructor(options){
    this.title = options.title;
    this.content = options.content;
    this.note = options.note;
    this.init();
    numberOfInstance ++;
    d3.select(window).on('resize.' + 'note' + numberOfInstance, this.init.bind(this));
  }

  init(){
    let x;
    let y;
    let w;
    let x0;
    //let y0;
    let w0;
    let titleNode = this.title.node();
    //let contentNode = this.content.node();
    let isOpen = false;
    let widget = this.note.node().parentNode.parentNode;

    x0 = titleNode.offsetLeft;
    //y0  = titleNode.offsetRight;
    w0 = 70;

    let contentNodeRect = this.content.node().getBoundingClientRect();

    //traverse three levels to get title
    let containerRect = widget.getBoundingClientRect();

    w = contentNodeRect.width > containerRect.width ? containerRect.width : contentNodeRect.width;

    x = x0 + w0 / 2 - w/2 > 0 ? x0 + w0 / 2 - w/2 : 0;
    y = x0 + w0 / 2 + w/2 < 0 ? 0 : null;


    let stylesProps = {
      left: x + 'px',
      maxWidth: '100%'
    };
    if (y) {
      stylesProps.right = y + 'px';
    }

    this.content.style(stylesProps);

    let that = this;

    this.title.on('click', function(){
        isOpen = !isOpen;
        d3.event.preventDefault();
        d3.event.stopPropagation();
        that.note.classed('is-open', isOpen);
    });

    document.addEventListener('click', function(){
        isOpen = false;
        that.note.classed('is-open', false);
    })
  }
}

module.exports = Note;
