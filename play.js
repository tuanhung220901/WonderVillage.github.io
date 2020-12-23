var level = 1;
var char1, char2, char3, char4, char5;
var list = ['0', '0', '0', '0', '0'];
var Vi_tri;
var result = ["0","0","0","0","0"];
var count;
var music = document.getElementById("Music");
var tieng_click_nut = document.getElementById("Tieng-click");
var tieng_win = document.getElementById("Tieng-win");
var tieng_thua = document.getElementById("Tieng-thua");
var so_luong;
var da_chon =[
    nhan_vat_1=[],
    nhan_vat_2=[],
    nhan_vat_3=[],
    nhan_vat_4=[],
    nhan_vat_5=[],
]
function start(){
    so_luong = Math.floor(level) + 1;
    //Đoạn này tạo ngẫu nhiên sản phẩm mà 5 nhân vật sở hữu (bắt đầu từ 2 sp r mỗi level tăng thêm 1 sp)
    char1 = Math.floor((Math.random() * so_luong) + 1);
    char2 = Math.floor((Math.random() * so_luong) + 1);
    char3 = Math.floor((Math.random() * so_luong) + 1);
    char4 = Math.floor((Math.random() * so_luong) + 1);
    char5 = Math.floor((Math.random() * so_luong) + 1);
    console.log(char1);
    console.log(char2);
    console.log(char3);
    console.log(char4);
    console.log(char5);
    //Bước này sẽ kt xem kết quả mình chon ntn
    random = [
        nhan_vat_1 = {dap_an: char1, position: false },
        nhan_vat_2 = {dap_an: char2, position: false },
        nhan_vat_3 = {dap_an: char3, position: false },
        nhan_vat_4 = {dap_an: char4, position: false },
        nhan_vat_5 = {dap_an: char5, position: false },
    ];
    count = 0;
}
function playgame() {
    $('.tmp').on('click', function () {
        tieng_click_nut.play();
        $('.box').empty();
        $('.box').css("display", "inline-block");
        $('.box').css("overflow", "auto");
        $('.box').css("border", "2px double black");
        // nghịch
        for(let i=0;i<so_luong;i++){
            $('.box').append("<button class='vp"+(i+1)+" clear Data btn btn-white btn-animate' data-id='"+ (i+1) +"'></button>");
        }
        
        var z = this;
        Vi_tri = z.getAttribute("id");
        for(let i=0;i<da_chon[0].length;i++){
            $(".vp"+da_chon[Vi_tri][i]).css("pointer-events","none");
        }
        $('.clear').on('click', function () {
            tieng_click_nut.play();
            $('.box').hide();
        })
        $(".Data").click(function () {
        // trỏ vào vị trí click chuột
            tieng_click_nut.play();
            var z = this;
            var Data_1 = z.getAttribute("data-id");
            list[Vi_tri] = Data_1;
            
            // console.log($(".ochonvatpham"));
            //Đang định truyền images
            $(".ochonvatpham").each(function (index) {
                if (list[index] != 0) {
                    $("#" + index).html("<img src='images/icon" + list[index] + ".png'>");
                }

            })
        })
        
    });
    $(".hien_thi").click(function () {
        tieng_click_nut.play();
        let change = [];
        let kt_lua_chon = 1;
        for(let i = 0;i < 5;i++){
            if(random[i].position == false){
                if(list[i] == 0){
                    kt_lua_chon = 0;
                }
            }
        }
        if(kt_lua_chon ==1){
                for (let i = 0; i < 5; i++) {
                //kt xem nó đã đúng hay chưa, đúng thì bỏ qua
                if (random[i].position == false) {
                    //kt đáp án và lựa chọn có giống nhau ko
                    if (random[i].dap_an == list[i]) {
                        //giống nhau t
                        result.splice(i, 1, "xanh");
                        // xanh
                        $("#thanh" +(i+1)).append("<div class='chuyenxanh'><img src='images/icon" + list[i] + "test.png'> </div>");
                        random[i].position = true;
                        random[i].dap_an = null;
                    }
                    else {
                        let check = true;
                        for (let j = 0; j < 5; j++) {
                            if (random[j].dap_an == list[i]) {
                                check = false;
                            }
                        }
                        if (check == true) {
                            // do
                            $("#thanh" + (i + 1)).append("<div class='chuyendo'><img src='images/icon" + list[i] + "test.png'> </div>");
                            result.splice(i, 1, "do");
                            random[i].position = true;
                            change.push(i);
                        }
                    }
                }
            }

            for (let i = 0; i < 5; i++) {
                if (random[i].position == false) {
                    let check = true;
                    for (let j = 0; j < 5; j++) {
                        if (random[j].dap_an == list[i]) {
                            check = false;
                        }
                    }
                    if (check == true) {
                        // đỏ
                        $("#thanh" + (i + 1)).append("<div class='chuyendo'><img src='images/icon" + list[i] + "test.png'> </div>");
                        result.splice(i, 1, "do");
                    }
                    else {
                        // vàng
                        $("#thanh" + (i + 1)).append("<div class='chuyenvang'><img src='images/icon" + list[i] + "test.png'> </div>");
                        result.splice(i, 1, "vang");
                    }
                }
            }
            // ???????????????
            for (let i = 0; i < change.length; i++) {
                random[change[i]].position = false;
            }
            console.log(result);
            for(let i=0;i<5;i++){
                da_chon[i].push(list[i]);
            }
            list = ['0', '0', '0', '0', '0']
            $(".ochonvatpham").html("chọn vật phẩm");
            // xử lý những lựa chọn đúng rồi thì xóa nút
            for(let i = 0; i < 5; i++){
                if(result[i] == "xanh"){
                    $("#" + i).html("<img src='images/dấu-tích.png' style='height:60px;width: 95px'>");  
                    $("#" + i).css("pointer-events","none");
                }
            }
            ++count;
            let kt = 0;
            if(count == 3){
                for(let i = 0; i < 5; i++){
                    if(result[i] != "xanh"){
                        kt = 1;
                        break;
                    }
                }   
                // LOSE
                if(kt==1){
                    tieng_thua.play();
                    $('.nen-THUA').css("display", "inline-block");
                    $('.nen-THUA').css("overflow", "auto");
                    $('.nen-THUA').append("<div class = 'khung-chinh-nut-tren'><button class='kq third chinh-Nut-tren Nut2'> </button></div>");
                    $('.nen-THUA').append("<div class ='khung-chinh-nut-duoi'><a href='NENGAME.html'><button class='kq third chinh-Nut-duoi Nut-thoat'> </button></a></div>");
                }
            }
            // xử lý trường hợp đúng luôn thì dừng
            let abc = 0;
            for(let i = 0; i < 5; i++){
                    if(result[i] == "xanh"){
                    abc++;
                    }
            }
            if(abc == 5){
                // WIN
                tieng_win.play();
                $('.nen-WIN').css("display", "inline-block");
                $('.nen-WIN').css("overflow", "auto");
                $(".nen-WIN").empty();
                $('.nen-WIN').append("<div class = 'khung-chinh-nut-tren'><button class='kq third chinh-Nut-tren Nut1'> </button></div>");
                $('.nen-WIN').append("<div class ='khung-chinh-nut-duoi'><a href='NENGAME.html'><button class='kq third chinh-Nut-duoi Nut-back'> </button></a></div>");
                level++;
                
            }  
            $(".kq").click(function(){
                tieng_click_nut.play();
                $("#level").html("MÀN " + level);
                $(".thanhvatpham").empty();
                $(".nen-WIN").hide();
                $(".nen-THUA").hide();
                $(".Nut2").hide();
                $(".Nut1").hide();
                $(".khung-chinh-nut-duoi").hide();
                $(".khung-chinh-nut-tren").hide();
                $(".Nut-back").hide();
                $(".Nut-thoat").hide();
                $(".khung-che").hide();
                $(".ochonvatpham").css("pointer-events","auto");
                $(".ochonvatpham").html("chọn vật phẩm");
                da_chon =[
                    nhan_vat_1=[],
                    nhan_vat_2=[],
                    nhan_vat_3=[],
                    nhan_vat_4=[],
                    nhan_vat_5=[],
                ]
                start();
            })
        }
        console.log(da_chon);
    })
}
$(document).ready(function () {
    $(".khung-bao-nut-am-nhac").click(function(){
        tieng_click_nut.play();
        music.play();
    })
    start();
    playgame();
});