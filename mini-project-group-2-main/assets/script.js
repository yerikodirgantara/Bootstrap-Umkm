$(document).ready(function () {
    // Sidebar
    window.openSidebar = function () {
        $(".sidebar").addClass("active");
    }

    window.closeSidebar = function () {
        $(".sidebar").removeClass("active");
    }

    // Populer
    $(".populer-item").hover(
        function() {
            $(this).find(".populer-desk").slideDown();
        },
        function() {
            $(this).find(".populer-desk").slideUp();
        }
    );

    // Product
    $('.card.produk').click(function() {
        var gambarProduk = $(this).find('.card-img-top.produk').attr('src');
        var namaProduk = $(this).find('.card-title.produk').text();
        var deskripsiProduk = $(this).find('.card-text.produk').text();

        $('#gambarProduk').attr('src', gambarProduk);
        $('#namaProduk').text(namaProduk);
        $('#deskripsiProduk').text(deskripsiProduk);

        var priceRange = $(this).find('.btn').text().split(' - ');
        var price6 = parseInt(priceRange[0].replace('Rp. ', '').replace('.', '').trim());
        var price12 = parseInt(priceRange[1].replace('Rp. ', '').replace('.', '').trim());

        $('#hargaProduk').text('Rp. ' + price6);

        $('.variantBtn').removeClass('active');
        $('.variantBtn[data-variant="6"]').addClass('active');

        $('.variantBtn').click(function() {
            var variant = $(this).data('variant');
            var price = (variant == 6) ? price6 : price12;
            $('#hargaProduk').text('Rp. ' + price);

            $('.variantBtn').removeClass('active');
            $(this).addClass('active');
        });

        $('#productModal').modal('show');
    });

    // Contact
    $('#KirimPesanan').click(function () {
        if ($('#name').val().trim() === '' || $('#message').val().trim() === '' || $('#whatsapp').val().trim() === '' || $('#jenis').val().trim() === '') {
            swal('', 'Mohon lengkapi semua form', 'warning');
            return false;
        }
    });

    $('#pesanForm').submit(function(event) {
        event.preventDefault();
        sendMessage();
    });

    function sendMessage() {
        const name = $("#name").val();
        const jenis = $("#jenis").val();
        const message = $("#message").val();
        const phoneNumber = $("#whatsapp").val();

        if (name.trim() === '' || message.trim() === '' || phoneNumber.trim() === '' || jenis.trim() === '') {
            swal('', 'Mohon lengkapi semua form', 'warning');
            return false;
        } else {
            $("#kirimm").modal("show");

            $("#kirim").click(function() {
                const messageBody = `Assalamualaikum\n\nNama : ${name}\nJenis Pesanan: ${jenis}\n\n${message}`;
                const url = `https://api.whatsapp.com/send?phone=6281228900185&text=${encodeURIComponent(messageBody)}`;

                window.open(url, "_blank");
            });
        }
    }
});
