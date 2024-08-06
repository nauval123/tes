export type getConnectionResponse = {
    id: number;
    source: number;
    target: number;
    source_handle:string;
    target_handle:string;
    label: string;
  } 
  
  export type createConnectionResponse = {
    diagram_id:number,
    source: string,
    source_handle: string,
    target: string,
    target_handle: string,
    uuid: string,
    label: string,
    type: string
  }
  

  export type createConnectionResponseResult = {
    status : string,
    data : {
      id: number , 
      diagram_id: number,
      source: number | string,
      sourceHandle: string,
      target: number,
      targetHandle: string,
      data: {
          uuid: string,
          label: string,
          type: string
      }
    }
  }

  export type updateConnectionResponse ={
    diagram_id:number,
    // source: string,
    // source_handle: string,
    // target: string,
    // target_handle: string,
    uuid: string,
    label: string,
    // type: string
  }