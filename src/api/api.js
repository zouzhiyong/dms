import axios from 'axios';
import Vue from 'vue'
import { Loading } from "element-ui";

let options = {
    text: '正在加载',
    lock: true,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.8)'
        //target: document.querySelector('.content-container')
}
let loadingInstance;
// import VueProgressBar from 'vue-progressbar'
// Vue.use(VueProgressBar, {
//     color: '#20a0ff',
//     failedColor: 'red',
//     thickness: '2px',
//     location: "bottom"
// })


let _time = null;
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // new Vue().$Progress.start()
    let ticket = 'BasicAuth ' + sessionStorage.getItem('Ticket') || '';
    config.baseURL = '/WebAppDms';
    config.timeout = 30000;
    config.headers = { 'Authorization': ticket };

    _time = setTimeout(() => {
        loadingInstance = Loading.service(options)
    }, 500);
    return config;
}, function(error) {
    // 对请求错误做些什么
    // this.$Progress.fail()

    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    // new Vue().$Progress.finish();    
    clearTimeout(_time);
    try {
        loadingInstance.close();
    } catch (e) {}
    if (response.data.result === true) {
        if (response.data.message !== "" && response.data.message !== null) {
            new Vue().$message({
                message: response.data.message,
                type: 'success'
            });
        }
    } else
    //判断返回状态是否为否
    if (response.data.result === false) {
        new Vue().$message({
            message: response.data.message,
            type: 'error'
        });
    }
    return response;
}, function(error) {
    // 对响应错误做点什么
    // this.$Progress.fail()

    clearTimeout(_time);
    try {
        loadingInstance.close();
    } catch (e) {}
    if (error.response.data.Message) {
        new Vue().$message({
            message: error.response.data.Message,
            type: 'error'
        });
    } else {
        new Vue().$message({
            message: error.response.data.ExceptionMessage,
            type: 'error'
        });
    }

    return Promise.reject(error);
});

//应用目录
export const UploadPath = "/WebAppDms/UpLoad/";
//登录
export const requestLogin = params => { return axios.post(`/api/Login/Login`, params).then(res => res.data); };
//公司设置页面
export const FindBasCompanyForm = params => { return axios.post(`/api/Company/FindBasCompanyForm`).then(res => res.data); };
export const SaveBasCompanyForm = params => { return axios.post(`/api/Company/SaveBasCompanyForm`, params).then(res => res.data); };
//模块设置页面
export const getMenu = params => { return axios.post(`/api/Menu/FindMenu`).then(res => res.data); };
export const FindSysModuleTree = params => { return axios.post(`/api/Menu/FindSysModuleTree`).then(res => res.data); };
export const FindSysMoudleTable = params => { return axios.post(`/api/Menu/FindSysMoudleTable`, params).then(res => res.data); };
export const FindSysMoudleForm = params => { return axios.post(`/api/Menu/FindSysMoudleForm`, params).then(res => res.data); };
export const SaveSysMoudleForm = params => { return axios.post(`/api/Menu/SaveSysMoudleForm`, params).then(res => res.data); };
export const DeleteSysMoudleRow = params => { return axios.post(`/api/Menu/DeleteSysMoudleRow`, params).then(res => res.data); };
//供应商设置页面
// export const FindBasSupplierList = params => { return axios.post(`/api/Supplier/FindBasSupplierList`).then(res => res.data); };
export const FindBasSupplierTable = params => { return axios.post(`/api/Supplier/FindBasSupplierTable`, params).then(res => res.data); };
export const DeleteBasSupplierRow = params => { return axios.post(`/api/Supplier/DeleteBasSupplierRow`, params).then(res => res.data); };
export const FindBasSupplierForm = params => { return axios.post(`/api/Supplier/FindBasSupplierForm`, params).then(res => res.data); };
export const SaveBasSupplierForm = params => { return axios.post(`/api/Supplier/SaveBasSupplierForm`, params).then(res => res.data); };
//仓库设置页面
export const FindBasWarehouseTable = params => { return axios.post(`/api/Warehouse/FindBasWarehouseTable`, params).then(res => res.data); };
export const DeleteBasWarehouseRow = params => { return axios.post(`/api/Warehouse/DeleteBasWarehouseRow`, params).then(res => res.data); };
export const FindBasWarehouseForm = params => { return axios.post(`/api/Warehouse/FindBasWarehouseForm`, params).then(res => res.data); };
export const SaveBasWarehouseForm = params => { return axios.post(`/api/Warehouse/SaveBasWarehouseForm`, params).then(res => res.data); };
//部门设置页面
export const FindBasDepartmentTable = params => { return axios.post(`/api/Department/FindBasDepartmentTable`, params).then(res => res.data); };
export const DeleteBasDepartmentRow = params => { return axios.post(`/api/Department/DeleteBasDepartmentRow`, params).then(res => res.data); };
export const FindBasDepartmentForm = params => { return axios.post(`/api/Department/FindBasDepartmentForm`, params).then(res => res.data); };
export const SaveBasDepartmentForm = params => { return axios.post(`/api/Department/SaveBasDepartmentForm`, params).then(res => res.data); };
//用户设置页面
export const FindBasDeptTree = params => { return axios.post(`/api/User/FindBasDeptTree`).then(res => res.data); };
export const FindBasUserTable = params => { return axios.post(`/api/User/FindBasUserTable`, params).then(res => res.data); };
export const FindBasUserForm = params => { return axios.post(`/api/User/FindBasUserForm`, params).then(res => res.data); };
export const SaveBasUserForm = params => { return axios.post(`/api/User/SaveBasUserForm`, params).then(res => res.data); };
export const DeleteBasUserRow = params => { return axios.post(`/api/User/DeleteBasUserRow`, params).then(res => res.data); };
//角色设置页面
export const FindSysRoleTable = params => { return axios.post(`/api/Role/FindSysRoleTable`, params).then(res => res.data); };
export const DeleteSysRoleRow = params => { return axios.post(`/api/Role/DeleteSysRoleRow`, params).then(res => res.data); };
export const FindSysRoleForm = params => { return axios.post(`/api/Role/FindSysRoleForm`, params).then(res => res.data); };
export const SaveSysRoleForm = params => { return axios.post(`/api/Role/SaveSysRoleForm`, params).then(res => res.data); };
//角色对应菜单及按钮设置页面
export const FindSysRoleMenuTree = params => { return axios.post(`/api/RoleMenu/FindSysRoleMenuTree`).then(res => res.data); };
export const FindSysRoleMenuTable = params => { return axios.post(`/api/RoleMenu/FindSysRoleMenuTable`, params).then(res => res.data); };
export const SaveSysRoleMenuForm = params => { return axios.post(`/api/RoleMenu/SaveSysRoleMenuForm`, params).then(res => res.data); };
//客户设置页面
export const FindBasRegionList = params => { return axios.post(`/api/Customer/FindBasRegionList`).then(res => res.data); };
export const FindBasCustomerTable = params => { return axios.post(`/api/Customer/FindBasCustomerTable`, params).then(res => res.data); };
export const DeleteBasCustomerRow = params => { return axios.post(`/api/Customer/DeleteBasCustomerRow`, params).then(res => res.data); };
export const FindBasCustomerForm = params => { return axios.post(`/api/Customer/FindBasCustomerForm`, params).then(res => res.data); };
export const SaveBasCustomerForm = params => { return axios.post(`/api/Customer/SaveBasCustomerForm`, params).then(res => res.data); };
//商品类别设置页面
export const FindBasItemCategoryTable = params => { return axios.post(`/api/ItemCategory/FindBasItemCategoryTable`, params).then(res => res.data); };
export const DeleteBasItemCategoryRow = params => { return axios.post(`/api/ItemCategory/DeleteBasItemCategoryRow`, params).then(res => res.data); };
export const FindBasItemGroupForm = params => { return axios.post(`/api/ItemCategory/FindBasItemGroupForm`, params).then(res => res.data); };
export const FindBasItemCategoryForm = params => { return axios.post(`/api/ItemCategory/FindBasItemCategoryForm`, params).then(res => res.data); };
export const SaveBasItemGroupForm = params => { return axios.post(`/api/ItemCategory/SaveBasItemGroupForm`, params).then(res => res.data); };
export const SaveBasItemCategoryForm = params => { return axios.post(`/api/ItemCategory/SaveBasItemCategoryForm`, params).then(res => res.data); };
//商品设置页面
export const FindBasItemTree = params => { return axios.post(`/api/Item/FindBasItemTree`).then(res => res.data); };
export const FindBasItemTable = params => { return axios.post(`/api/Item/FindBasItemTable`, params).then(res => res.data); };
export const DeleteBasItemRow = params => { return axios.post(`/api/Item/DeleteBasItemRow`, params).then(res => res.data); };
export const FindBasItemForm = params => { return axios.post(`/api/Item/FindBasItemForm`, params).then(res => res.data); };
export const FindBasItemGroupCategoryForm = params => { return axios.post(`/api/Item/FindBasItemGroupCategoryForm`, params).then(res => res.data); };
export const SaveBasItemForm = params => { return axios.post(`/api/Item/SaveBasItemForm`, params).then(res => res.data); };
//采购管理页面
export const FindPurOrderForm = params => { return axios.post(`/api/Purchaser/FindPurOrderForm`, params).then(res => res.data); };