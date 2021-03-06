import {gql} from 'apollo-boost';

const addNewLawyer = gql`
mutation ($lawyer: LawyerInputType!) {
  LawyerMutations {
      lawyer(lawyer: $lawyer) {
        id
        name
        description
        expertise
        email
        address
        phone
        seniority
        img
        idAI
      }
    }
  }
`;

const updateLawyer = gql`
mutation updateLawyer ($id: String, $lawyer:LawyerInputType!) {
  LawyerMutations {
    lawyer (lawyer: $lawyer, id:$id) {
      id
			description
			expertise
    }
  }
}
`;

const getLawyer = gql`
query($email:String!){
  LawyerQueries{
    lawyer(email:$email){
      id
      name
      description
      expertise
      email
      address 
      phone
      seniority
      img
      classactions
      idAI
    }
  }
}
`;

const getAllLawyers = gql`
{
  LawyerQueries {
    lawyers {
      id
      name
      description
      expertise
      email
      address
      phone
      seniority
      img
      classactions {    		 
          id
					name
          description
          status
        
      }
      idAI
    }
  }
}
`;

export default {
  addNewLawyer,
  getLawyer,
  getAllLawyers,
  updateLawyer
};