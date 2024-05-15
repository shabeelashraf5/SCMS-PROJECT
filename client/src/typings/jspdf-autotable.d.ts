/*declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: AutoTableOptions) => AutoTable;
    }
  
    interface AutoTable {
      addPage: () => void;
    }
  
    interface AutoTableOptions {
      startY?: number;
      head?: any[][];
      body?: any[][];
      theme?: string;
      margin?: { top: number; right?: number; bottom?: number; left?: number };
      styles?: {
        fontSize?: number;
        font?: string;
        fontStyle?: string;
        overflow?: 'linebreak' | 'ellipsize' | 'visible' | 'hidden' | 'visible';
        cellPadding?: number;
        rowHeight?: number;
        columnWidth?: 'wrap' | number | 'auto';
        fillColor?: number | [number, number, number] | string;
        textColor?: number | [number, number, number] | string;
        valign?: 'top' | 'middle' | 'bottom';
        halign?: 'left' | 'center' | 'right';
        lineColor?: number | [number, number, number] | string;
        lineWidth?: number;
      };
    }
  }*/