import Paper from 'paper';

class Grid {
  minorSpacing = 15;

  minorPerMajor = 4;

  majorOnlyZoom = 0.3;

  noGridZoom = 0.1;

  minorStyle = {
    strokeColor: '#d8e3ec',
    strokeWidth: 1,
    strokeScaling: false,
  };

  majorStyle = {
    strokeColor: '#c2ccd4',
    strokeWidth: 1,
    strokeScaling: false,
  };

  constructor(paper) {
    this.paper = paper;
    this.minorGroup = new Paper.Group();
    this.majorGroup = new Paper.Group();
    this.gridLayer = new Paper.Layer({ name: 'grid' });
    this.gridLayer.addChildren([this.minorGroup, this.majorGroup]);
    this.gridLayer.sendToBack();
  }

  nearest(point) {
    return point.divide(this.minorSpacing).round().multiply(this.minorSpacing);
  }

  draw() {
    this.minorGroup.removeChildren();
    this.majorGroup.removeChildren();

    const {
      left, right, top, bottom,
    } = this.paper.view.bounds;

    const { zoom } = this.paper.view;

    if (zoom < this.noGridZoom) {
      return;
    }

    // Horizontal.
    let y = Math.trunc(top / this.minorSpacing) * this.minorSpacing;
    while (y < bottom) {
      if ((y / this.minorSpacing) % this.minorPerMajor) {
        if (zoom > this.majorOnlyZoom) {
          const path = this.paper.Path.Line([left, y], [right, y]);
          this.minorGroup.addChild(path);
        }
      } else {
        const path = this.paper.Path.Line([left, y], [right, y]);
        this.majorGroup.addChild(path);
      }

      y += this.minorSpacing;
    }

    // Vertical.
    let x = Math.trunc(left / this.minorSpacing) * this.minorSpacing;
    while (x < right) {
      if ((x / this.minorSpacing) % this.minorPerMajor) {
        if (zoom > this.majorOnlyZoom) {
          const path = this.paper.Path.Line([x, top], [x, bottom]);
          this.minorGroup.addChild(path);
        }
      } else {
        const path = this.paper.Path.Line([x, top], [x, bottom]);
        this.majorGroup.addChild(path);
      }

      x += this.minorSpacing;
    }

    this.majorGroup.style = this.majorStyle;
    this.minorGroup.style = this.minorStyle;

    this.majorGroup.bringToFront();
  }
}

export default Grid;
