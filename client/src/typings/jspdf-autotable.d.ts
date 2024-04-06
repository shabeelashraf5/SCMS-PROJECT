declare module 'jspdf' {
    interface jsPDF {
      autoTable: (config: any) => jsPDF;
    }
  }