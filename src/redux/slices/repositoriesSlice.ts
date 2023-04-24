import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

type GetRepositoriesArguments = {
   searchValue?: string
   pagination?: string
   button?: string
}

export const getRepositories = createAsyncThunk<Response, GetRepositoriesArguments, {rejectValue: string}>("repositoriesSlice/getRepositories", 
   async ({ searchValue, pagination, button },{rejectWithValue}) => {
      try {
         const query = {
            "query": `
               query { 
                  search(query: "${searchValue}" type: REPOSITORY ${button === 'prev' ? 'last': 'first'}: 10 ${pagination ? pagination : ''}){
                     pageInfo{
                        startCursor
                        endCursor
                     }
                     repositoryCount
                     edges{
                        node{
                           ... on Repository {
                              id
                              name
                              stargazerCount
                              pushedAt
                              url
                              description
                              owner{
                                 login
                                 avatarUrl
                                 url
                              }
                              languages(first: 10){
                                 edges{
                                    node{
                                       ... on Language {
                                          name
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            `
         }
      
         const queryDefault = {
            "query": `
               query { 
                  repositoryOwner(login: "miefim") {
                     repositories(${button === 'prev' ? 'last': 'first'}: 10 ${pagination ? pagination : ''}) {
                        pageInfo{
                           startCursor
                           endCursor
                        }
                        totalCount
                        edges {
                           node {
                              id
                              name
                              stargazerCount
                              pushedAt
                              url
                              description
                              owner{
                                 login
                                 avatarUrl
                                 url
                              }
                              languages(first: 10){
                                 edges{
                                    node{
                                       ... on Language {
                                          name
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            `
         }
         
         const response = await fetch(`https://api.github.com/graphql`, {
            method: 'POST',
            headers: {
               "Content-Type": "application/json", 
               Authorization: `bearer ${import.meta.env.VITE_API_KEY}`
            },
            body: JSON.stringify(searchValue ? query : queryDefault)
         })
         
         let result = await response.json() 

         return result
           
      } 
      catch (error) { 

         return rejectWithValue('Server Error(')
         
      }
   }
)

export interface Response {
   data: {
      search?: {
         repositoryCount: number
         pageInfo: PageInfo
         edges: Repository[]
      }
      repositoryOwner?: {
         repositories: {
            totalCount: number
            pageInfo: PageInfo
            edges: Repository[]
         }
      }
   }
}

type PageInfo = {
   startCursor: string
   endCursor: string
}

type Language = {
   node: {
      name: string
   }
}

export type Repository = {
   node: {
      id: string
      name: string
      url: string
      description: string
      stargazerCount: number
      pushedAt: string
      owner: {
         login: string
         url: string
         avatarUrl: string
      }
      languages: {
         edges: Language[]
      }
   }
}

type RepositoriesSliceState = {
   repositories: Repository[] | null
   repositoryCount: number | null
   startCursor: string | null
   endCursor: string | null
   isLoading: boolean
   error: string | null
   isFirstQuery: boolean
}

const initialState: RepositoriesSliceState = {
   repositories: null,
   repositoryCount: null,
   startCursor: null,
   endCursor: null,
   isLoading: false,
   error: null,
   isFirstQuery: true
}

export const repositoriesSlice = createSlice({
   name: 'repositoriesSlice',
   initialState,

   reducers: {},

   extraReducers: (builder) => {
      builder.addCase(getRepositories.pending, (state) => {
         state.isLoading = true
         state.error = null
      })

      builder.addCase(getRepositories.fulfilled, (state, action) => {
         state.isLoading = false
         if(action.payload.data.search){
            state.repositories = action.payload.data.search.edges
            state.repositoryCount = action.payload.data.search.repositoryCount
            state.startCursor = action.payload.data.search.pageInfo.startCursor
            state.endCursor = action.payload.data.search.pageInfo.endCursor
         }
         else if (action.payload.data.repositoryOwner){
            state.isFirstQuery = false
            state.repositories = action.payload.data.repositoryOwner.repositories.edges
            state.repositoryCount = action.payload.data.repositoryOwner.repositories.totalCount
            state.startCursor = action.payload.data.repositoryOwner.repositories.pageInfo.startCursor
            state.endCursor = action.payload.data.repositoryOwner.repositories.pageInfo.endCursor
         }
      })

      builder.addCase(getRepositories.rejected, (state, action) => {
         state.isLoading = false
         if(action.payload) {
            state.error = action.payload
         }
      })
   }
})

export const repositoriesSelector = (state: RootState) => state.repositoriesSlice

export default repositoriesSlice.reducer