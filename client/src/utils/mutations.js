import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!){
        deleteBook(bookId: $bookId) {
            User {
                _id
                username
                savedBooks
            }
        }
    }`

export const SAVE_BOOK = gql `
    mutation saveBook(){
        saveBook() {
            User {
                _id
                username
                savedBooks
            }
        }
    }`