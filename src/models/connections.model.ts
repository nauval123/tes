export type getConnectionResponse = {
    id: number;
    source: number;
    target: number;
    source_handle:string;
    target_handle:string;
    label: string;
  } 
  
  export type createConnectionResponse = {
    source: number;
    target: number;
    label: string;
    // source_handle:string;
    // target_handle:string;
  }

  export type updateConnectionResponse ={
    id:number;
    source: number;
    target: number;
    label: string;
    // source_handle:string;
    // target_handle:string;
  }