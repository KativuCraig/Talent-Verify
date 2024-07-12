import axios from 'axios';

export function getEmployees() {
  return axios.get('http://127.0.0.1:8000/Employee/')
    .then(response => response.data)
}

export function deleteEmployees(employee_id_number) {
  return axios.delete('http://127.0.0.1:8000/Employee/' + employee_id_number + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  });
  
}

export function addEmployee(employee) {
  return axios.post('http://127.0.0.1:8000/Employee/', {
    name: employee.name,
    employee_id_number: employee.employee_id_number,
    company_name: employee.company_name,
    department: employee.department,
    role: employee.role,
    date_started: employee.date_started,
    date_left: employee.date_left,
    duties: employee.duties
  })
    .then(response => response.data);
}


export function updateEmployee(Eid, employee) {
  return axios.put('http://127.0.0.1:8000/Employee/' + Eid + '/', {
    name: employee.name,
    employee_id_number: employee.employee_id_number,
    company_name: employee.company_name,
    department: employee.department,
    role: employee.role,
    date_started: employee.date_started,
    date_left: employee.date_left,
    duties: employee.duties
  })
   .then(response => response.data)
}


export function getCompanies() {
  return axios.get('http://127.0.0.1:8000/Company/')
    .then(response => response.data)
}

export function deleteCompanies(registration_number) {
  return axios.delete(`http://127.0.0.1:8000/Company/${registration_number}/`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.data);
}

export function addCompany(company) {
  return axios.post('http://127.0.0.1:8000/Company/', {
    name: company.name,
    date_of_registration: company.date_of_registration,
    registration_number: company.registration_number,
    address: company.address,
    contact_person: company.contact_person,
    departments: company.departments,
    number_of_employees: company.number_of_employees,
    contact_phone: company.contact_phone,
    email_address: company.email_address,
  
  })
    .then(response => response.data);
}


export function updateCompany(registration_number, company) {
  return axios.put(`http://127.0.0.1:8000/Company/${registration_number}/`, {
    name: company.name,
    date_of_registration: company.date_of_registration,
    registration_number: company.registration_number,
    address: company.address,
    contact_person: company.contact_person,
    departments: company.departments,
    number_of_employees: company.number_of_employees,
    contact_phone: company.contact_phone,
    email_address: company.email_address
  })
   .then(response => response.data)
}

