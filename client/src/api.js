import React from 'react';
import axios from 'axios';
import {APIRootPath} from '@fed-exam/config';
import { type } from 'os';

const APIRootPath = `http://localhost:9876`

export let Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
    togleHideShow: boolean;
    setTogleHideShow: (p: boolean) => void

}



export let ApiClient = {
    getModel: (moudle_id:number) => 
    // getTickets: () => Promise<Ticket[]>;    //  getting all the Tickets
    // getTicketsPage: (pageNumber:number) => Promise<Ticket[]>;   //  getting all the Tickets in the page
    // getFilterTickets: (val:string) => Promise<Ticket[]>;    //Getting the Search result
    // getAmountOfTickets: (bool:boolean) => Promise<any>;    //Getting the Amount of Tickets
    // cloneTickets: (t:Ticket) => Promise<Ticket[]>;  // Posting a new Clone Ticket in the server
}



export let createApiClient = (): ApiClient => {
    return {
        
        // getTicketsPage: (pageNumber) => {
        //     return axios.get(APIRootPath,{params: {page: pageNumber}}).then((res) => res.data);
        // },
        // getFilterTickets: (String) => {
        //     return axios.get(APIRootPath,{params: {val: String}}).then((res) => res.data);
        // },
        // getAmountOfTickets: (any) => {
        //     return axios.get(APIRootPath,{params: {bool: any}}).then((res) => res.data);
        // },
        // getTickets: () => {
        //     return axios.get(APIRootPath).then((res) => res.data);
        // },
        // cloneTickets: (t:Ticket) => {
        //     return axios.post(APIRootPath, t).then((res) => res.data);
        // }
    }
}

