export type getConnectionResponse = {
    id: number;
    source: number;
    target: number;
    label: string;
  } 
  
  export type createConnectionResponse = {
    source: number;
    target: number;
    label: string;
  }

  export type updateConnectionResponse ={
    id:number;
    source: number;
    target: number;
    label: string;
  }