export default function set_premission(list = []) {
    let routeAll = list; // 当前用户路由列表
    let route = list[0].children; // 当前用户路由列表
    let premission = JSON.parse(localStorage.getItem('admin_permissions')) || []; // 当前用户权限列表
    route.map(item => {
        premission.map(pItem => {
            if (item.children) {
                item.children.map(childItem => {
                    if (childItem.meta && childItem.meta.permissionName === pItem.name) {
                        childItem.meta.permissions = pItem.jurisdictions.map(item => {
                            return item.name.split('.')[1];
                        });
                    }
                });
            } else if (item.name && item.meta && item.meta.permissionName) {
                if (item.meta.permissionName === pItem.name) {
                    item.meta.permissions = pItem.jurisdictions.map(item => {
                        return item.name.split('.')[1];
                    });
                }
            }
        });
    });
    routeAll[0].children = route;
    return routeAll;
}
