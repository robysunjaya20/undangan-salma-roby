document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form-rsvp");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nama = document.getElementById("rsvp-nama").value;

        const jumlah =
            document.getElementById("rsvp-jumlah").value;

        const kehadiran =
            document.querySelector(
                'input[name="kehadiran"]:checked'
            ).value;

        const pesan =
`Halo, saya ${nama}.

Konfirmasi Kehadiran:
${kehadiran}

Jumlah Tamu:
${jumlah} orang.

Terima kasih.`;

        const nomor = "62895385191979";

        window.open(
            `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`,
            "_blank"
        );

    });

});