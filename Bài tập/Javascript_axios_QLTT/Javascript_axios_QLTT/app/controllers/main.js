getUsers();
function dom(element) {
    return document.querySelector(element);
}
function getUsers(searchUser) {
    apiGetUser(searchUser)
        .then((response) => {
            let user = response.data.map((user) => {
                return new Users(
                    user.id,
                    user.account,
                    user.password,
                    user.name,
                    user.email,
                    user.language,
                    user.typeOfUser,
                    user.discription,
                    user.image
                )
            })
            display(user);
        })
        .catch((error) => {
            console.log(error);
        })
}

function display(user) {
    let output = user.reduce((result, user, index) => {
        return result + `
            <tr>
                <td>${index + 1}</td>
                <td>${user.account}</td>
                <td>${user.password}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.language}</td>
                <td>${user.typeOfUser}</td>
                <td>${user.discription}</td>
                <td >
                <img src="${user.image}" width="50px" height="50px" />
                </td>
                <td>
                    <button
                        class="btn btn-success"
                        data-type = "update"
                        data-id = "${user.id}"
                        data-toggle="modal"
                        data-target="#myModal">Cập nhật</button>
                    <button class="btn btn-danger" data-type = "delete" data-id = "${user.id}">Xóa</button>
                </td>
            </tr>
        `
    }, "")
    dom("#tblDanhSachNguoiDung").innerHTML = output;
}
//=============Các hàm xử lý thêm, xóa, cập nhật,hiển thị=============
//add
function addUser(user) {
    apiAddUser(user)
        .then(() => {
            getUsers()
        })
        .catch((error) => {
            console.log(error);
        })

}
//delete
function deleteUser(userId) {
    apiDeleteUser(userId)
        .then(() => {
            getUsers()
        })
        .catch((error) => {
            console.log(error);
        })
}
//update
function updateUser(userId, user) {
    apiUpdateUser(userId, user)
        .then(() => {
            getUsers();
        })
        .catch((error) => {
            console.log(error);
        })
}
//=============Các hàm xử lý sự kiện click thêm, xóa, cập nhật,hiển thị=============
//select form
function resetForm() {
    dom("#TaiKhoan").value = "";
    dom("#HoTen").value = "";
    dom("#MatKhau").value = "";
    dom("#Email").value = "";
    dom("#HinhAnh").value = "";
    dom("#loaiNguoiDung").value = "";
    dom("#loaiNgonNgu").value = "";
    dom("#MoTa").value = "";
}
dom("#btnThemNguoiDung").addEventListener("click", () => {
    dom("#TaiKhoan").disabled = false;
    dom(".modal-title").innerHTML = "Thêm người dùng"
    dom(".modal-footer").innerHTML = `
    <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
    <button class="btn btn-success" data-type = "add" data-dismiss="modal">Thêm</button> 
    `
    resetForm()
})
//add
dom(".modal-footer").addEventListener("click", (evt) => {
    let element = evt.target.getAttribute("data-type");
    let userId = dom("#MaUser").value;
    let account = dom("#TaiKhoan").value;
    let name = dom("#HoTen").value;
    let password = dom("#MatKhau").value;
    let email = dom("#Email").value;
    let image = dom("#HinhAnh").value;
    let typeOfUser = dom("#loaiNguoiDung").value;
    let language = dom("#loaiNgonNgu").value;
    let discription = dom("#MoTa").value;
    if (!validateForm()) {
        return;
    }
    let user = new Users(null, account, password, name, email, language, typeOfUser, discription, image);
    if (element === "add") {
        addUser(user);
    } else if (element === "update") {
        updateUser(userId, user);
    }

})
//delete,update
dom(".table-bordered").addEventListener("click", (evt) => {
    let element = evt.target.getAttribute("data-type");
    let userId = evt.target.getAttribute("data-id");
    if (element === "delete") {
        deleteUser(userId);
    } else if (element === "update") {
        dom("#TaiKhoan").disabled = true;
        dom(".modal-title").innerHTML = "Cập nhật người dùng"
        dom(".modal-footer").innerHTML = `
             <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
             <button class="btn btn-success" data-type = "update" data-dismiss="modal">Cập nhật</button> 
         `
        apiGetUserById(userId)
            .then((response) => {
                let user = response.data;
                dom("#MaUser").value = user.id;
                dom("#TaiKhoan").value = user.account;
                dom("#HoTen").value = user.name;
                dom("#MatKhau").value = user.password;
                dom("#Email").value = user.email;
                dom("#HinhAnh").value = user.image;
                dom("#loaiNguoiDung").value = user.typeOfUser;
                dom("#loaiNgonNgu").value = user.language;
                dom("#MoTa").value = user.discription;
            })
            .catch((error) => {
                console.log(error);
            })
    }
})
dom("#search").addEventListener("keydown", (evt) => {
    if (evt.key !== "Enter") return;
    getUsers(evt.target.value);
})
// validate form
function validateAccount() {
    let account = dom("#TaiKhoan").value
    let spanEL = dom("#show1")
    spanEL.style.color = "red";
    if (!account) {
        spanEL.innerHTML = "Tài khoản không được để trống";
        return false;
    }
    apiGetUser()
        .then((response) => {
            let user = response.data.map((user) => {
                return user.account;
            })
            for (let i = 0; i < user.length; i++) {
                if (account === user[i]) {
                    spanEL.innerHTML = "Tài khoản đã tồn tại";
                    return false;
                }
            }
        })
    spanEL.innerHTML = "";
    return true;
}
function validateName() {
    let name = dom("#HoTen").value
    let spanEL = dom("#show2")
    spanEL.style.color = "red";
    if (!name) {
        spanEL.innerHTML = "Tên không được để trống"
        return false;
    }
    let hasNumberInName = /^([^0-9]*)$/;
    if (!hasNumberInName.test(name)) {
        spanEL.innerHTML = "Tên không được có ký số";
        return false;
    }
    let regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/
    if (regex.test(name)) {
        spanEL.innerHTML = "Tên không được có kí tự đặc biệt";
        return false;
    }

    spanEL.innerHTML = "";
    return true;
}
function validatePassword() {
    let password = dom("#MatKhau").value
    let spanEL = dom("#show3")
    spanEL.style.color = "red";
    if (!password) {
        spanEL.innerHTML = "Mật khẩu không được để trống"
        return false;
    }
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?*]).{6,8}$/;
    if (!regex.test(password)) {
        spanEL.innerHTML = "Mật Khẩu từ 6-8 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}

function validateEmail() {
    let email = dom("#Email").value
    let spanEL = dom("#show4")
    spanEL.style.color = "red";
    if (!email) {
        spanEL.innerHTML = "Email không được để trống"
        return false;
    }
    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!regex.test(email)) {
        spanEL.innerHTML = "Email không đúng định dạng";
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validateImage() {
    let image = dom("#HinhAnh").value
    let spanEL = dom("#show5")
    spanEL.style.color = "red";
    if (!image) {
        spanEL.innerHTML = "Hình ảnh không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}

function validateTypeOfUser() {
    let typeOfUser = dom("#loaiNguoiDung").value
    let spanEL = dom("#show6")
    spanEL.style.color = "red";
    if (typeOfUser === "") {
        spanEL.innerHTML = "Loại người dùng không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validateLanguage() {
    let language = dom("#loaiNgonNgu").value
    let spanEL = dom("#show7")
    spanEL.style.color = "red";
    if (language === "") {
        spanEL.innerHTML = "Loại ngôn ngữ không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validateDiscription() {
    let discription = dom("#MoTa").value
    let spanEL = dom("#show8")
    spanEL.style.color = "red";
    if (!discription) {
        spanEL.innerHTML = "Mô tả không được để trống"
        return false;
    }
    if (discription.length > 60) {
        spanEL.innerHTML = "Không vượt quá 60 kí tự"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}

function validateForm() {
    let form = true;
    form =
        validateAccount() &
        validatePassword() &
        validateName() &
        validateEmail() &
        validateImage() &
        validateTypeOfUser() &
        validateLanguage() &
        validateDiscription();
    if (!form) {
        return false;
    }
    return true;
}
































































