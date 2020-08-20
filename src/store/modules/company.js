const state = {
  companies: [
    {
      company: {
        id: 1,
        name: "Company A",
        departments: [
          {
            id: 1,
            name: "Dept 1",
            areas: [
              {
                id: 1,
                name: "Area 1",
                areaType: "inside",
              },
              {
                id: 2,
                name: "Area 2",
                areaType: "outside",
              },
            ],
          },
          {
            id: 2,
            name: "Dept 2",
            areas: [
              {
                id: 3,
                name: "Area 3",
                areaType: "inside",
              },
              {
                id: 4,
                name: "Area 4",
                areaType: "outside",
              },
            ],
          },
          {
            id: 3,
            name: "Dept 3",
            areas: [
              {
                id: 5,
                name: "Area 5",
                areaType: "inside",
              },
              {
                id: 6,
                name: "Area 6",
                areaType: "outside",
              },
            ],
          },
          {
            id: 4,
            name: "Dept 4",
            areas: [
              {
                id: 7,
                name: "Area 7",
                areaType: "inside",
              },
              {
                id: 8,
                name: "Area 8",
                areaType: "outside",
              },
            ],
          },
        ],
      },
    },
    {
      company: {
        id: 2,
        name: "Company B",
        departments: [
          {
            name: "Dept A",
          },
          {
            name: "Dept B",
          },
          {
            name: "Dept C",
          },
          {
            name: "Dept D",
          },
        ],
      },
    },
  ],
};

const getters = {
  getCompanyList: (state) => {
    const companiesIdName = state.companies.map(({ company }) => {
      return {
        company_id: company.id,
        company_name: company.name,
      };
    });
    return companiesIdName;
  },
  getDepartmentList: (state) => (company_id) => {
    const companyObj = state.companies.find(({ company }) => company.id == company_id).company;
    const departmentIdName = companyObj.departments.map((department) => {
      return {
        department_id: department.id,
        department_name: department.name,
      };
    });
    return departmentIdName;
  },
  getAreaList_dup: (state) => (company_id, department_id) => {
    const companyObj = state.companies.find(({ company }) => company.id == company_id).company;
    const departmentObj = companyObj.departments.find(
      (department) => department.id == department_id
    );
    const areaIdName = departmentObj.areas.map((area) => {
      return {
        area_id: area.id,
        area_name: area.name,
        area_type: area.areaType,
      };
    });
    return areaIdName;
  },
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
