var plaintexta = document.getElementById("plaintext");
var keya = document.getElementById("key");
var ans = document.getElementById("answer");


var IP = [ 58, 50, 42, 34, 26, 18,
                10, 2, 60, 52, 44, 36, 28, 20,
                12, 4, 62, 54, 46, 38,
                30, 22, 14, 6, 64, 56,
                48, 40, 32, 24, 16, 8,
                57, 49, 41, 33, 25, 17,
                9, 1, 59, 51, 43, 35, 27,
                19, 11, 3, 61, 53, 45,
                37, 29, 21, 13, 5, 63, 55,
                47, 39, 31, 23, 15, 7 ];
var IP1 = [ 40, 8, 48, 16, 56, 24, 64,
                32, 39, 7, 47, 15, 55,
                23, 63, 31, 38, 6, 46,
                14, 54, 22, 62, 30, 37,
                5, 45, 13, 53, 21, 61,
                29, 36, 4, 44, 12, 52,
                20, 60, 28, 35, 3, 43,
                11, 51, 19, 59, 27, 34,
                2, 42, 10, 50, 18, 58,
                26, 33, 1, 41, 9, 49,
                17, 57, 25 ];

        // first key-hePermutation Table
var PC1 = [ 57, 49, 41, 33, 25,
                17, 9, 1, 58, 50, 42, 34, 26,
                18, 10, 2, 59, 51, 43, 35, 27,
                19, 11, 3, 60, 52, 44, 36, 63,
                55, 47, 39, 31, 23, 15, 7, 62,
                54, 46, 38, 30, 22, 14, 6, 61,
                53, 45, 37, 29, 21, 13, 5, 28,
                20, 12, 4 ];

        // second key-Permutation Table
var PC2 = [ 14, 17, 11, 24, 1, 5, 3,
                28, 15, 6, 21, 10, 23, 19, 12,
                4, 26, 8, 16, 7, 27, 20, 13, 2,
                41, 52, 31, 37, 47, 55, 30, 40,
                51, 45, 33, 48, 44, 49, 39, 56,
                34, 53, 46, 42, 50, 36, 29, 32 ];

        // Expansion D-box Table
var EP = [ 32, 1, 2, 3, 4, 5, 4,
                5, 6, 7, 8, 9, 8, 9, 10,
                11, 12, 13, 12, 13, 14, 15,
                16, 17, 16, 17, 18, 19, 20,
                21, 20, 21, 22, 23, 24, 25,
                24, 25, 26, 27, 28, 29, 28,
                29, 30, 31, 32, 1 ];

        // Straight Permutation Table
var P = [ 16, 7, 20, 21, 29, 12, 28,
                17, 1, 15, 23, 26, 5, 18,
                31, 10, 2, 8, 24, 14, 32,
                27, 3, 9, 19, 13, 30, 6,
                22, 11, 4, 25 ];

        // S-box Table
var sbox = [
                [ [ 14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7 ],
                        [ 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8 ],
                        [ 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0 ],
                        [ 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ] ],
                [ [ 15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10 ],
                        [ 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5 ],
                        [ 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15 ],
                        [ 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ] ],
                [ [ 10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8 ],
                        [ 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1 ],
                        [ 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7 ],
                        [ 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ] ],
                [ [ 7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15 ],
                        [ 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9 ],
                        [ 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4 ],
                        [ 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 ] ],
                [ [ 2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9 ],
                        [ 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6 ],
                        [ 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14 ],
                        [ 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ] ],
                [ [ 12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11 ],
                        [ 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8 ],
                        [ 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6 ],
                        [ 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 ] ],
                [ [ 4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1 ],
                        [ 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6 ],
                        [ 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2 ],
                        [ 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 ] ],
                [ [ 13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7 ],
                        [ 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2 ],
                        [ 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8 ],
                        [ 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11 ] ]
        ];
var shiftBits = [ 1, 1, 2, 2, 2, 2, 2, 2,
                1, 2, 2, 2, 2, 2, 2, 1 ];


function hextobin(hex) {
        hex = hex.toString()
        hex = hex.replace("0x", "").toLowerCase();
        var out = "";
        for(var c of hex) {
                switch(c) {
                        case '0': out += "0000"; break;
                        case '1': out += "0001"; break;
                        case '2': out += "0010"; break;
                        case '3': out += "0011"; break;
                        case '4': out += "0100"; break;
                        case '5': out += "0101"; break;
                        case '6': out += "0110"; break;
                        case '7': out += "0111"; break;
                        case '8': out += "1000"; break;
                        case '9': out += "1001"; break;
                        case 'a': out += "1010"; break;
                        case 'b': out += "1011"; break;
                        case 'c': out += "1100"; break;
                        case 'd': out += "1101"; break;
                        case 'e': out += "1110"; break;
                        case 'f': out += "1111"; break;
                        default: return "";
                }
        }

        return out;
}

function bintohex(bin) {
        var out = "";
        var binArr = [];
        for (let i = 0; i < bin.length; i+=4) {
                var element = bin.slice(i,i+4);
                binArr.push(element)
                
        }
        for(var c of binArr) {
                switch(c) {
                        case '0000': out += "0"; break;
                        case '0001': out += "1"; break;
                        case '0010': out += "2"; break;
                        case '0011': out += "3"; break;
                        case '0100': out += "4"; break;
                        case '0101': out += "5"; break;
                        case '0110': out += "6"; break;
                        case '0111': out += "7"; break;
                        case '1000': out += "8"; break;
                        case '1001': out += "9"; break;
                        case '1010': out += "A"; break;
                        case '1011': out += "B"; break;
                        case '1100': out += "C"; break;
                        case '1101': out += "D"; break;
                        case '1110': out += "E"; break;
                        case '1111': out += "F"; break;
                        default: return "";
                }
        }
        return out
}

function permutation(input,sequence) {
        var output = "";
        input = hextobin(input);
        for (var i = 0; i < sequence.length; i++) {
                output += input.charAt(sequence[i]-1)
        }
        output = bintohex(output);
        return output
}

function xor(a, b) {
        while (a.length < b.length) {
            a = "0" +a
        }
        var res = "",
            i = a.length,
            j = b.length;
        while (i-->0 && j-->0)
            res = (parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(j), 16)).toString(16) + res;
        return res;
}

function leftCircularShift(input, numBits) {
        var n = input.length * 4;
        var  perm = [n];
        for ( i = 0; i < n - 1; i++) {
                perm[i] = (i + 2);
        }
        perm[n - 1] = 1;
        console.log(perm)
        while (numBits-- > 0) {
                input = permutation(input, perm);
        }
        return input;
}

function getKeys(key) {
        keys = []
        key = permutation(key,PC1);
        console.log(key)
        for (var i = 0; i < 16; i++) {
                key = leftCircularShift(key.substring(0, 7), shiftBits[i]) + leftCircularShift(key.substring(7, 14),shiftBits[i]);
                // second key permutation
                keys[i] = permutation(key,PC2);
        }
        return keys;
}

function sBox(input) {
        output = "";
        input = hextobin(input);
        for (var i = 0; i < 48; i += 6) {
                temp = input.substring(i, i + 6);
                num = i / 6;
                row = parseInt(temp.charAt(0) + "" + temp.charAt(5), 2);
                col = parseInt(temp.substring(1, 5), 2);
                output += sbox[num][row][col].toString(16);
        }
        return output;
}

function round(input,key,num) {
        left = input.substring(0, 8);
        temp = input.substring(8, 16);
        right = temp;
        // Expansion permutation
        temp = permutation(temp,EP);
        // xor temp and round key
        temp = xor(temp, key);
        // lookup in s-box table
        temp = sBox(temp);
        // Straight D-box
        temp = permutation(temp,P);
        // xor
        left = xor(left, temp);
        console.log("Round " + (num + 1) + " " + right.toUpperCase() + " " + left.toUpperCase() + " " + key.toUpperCase());

        // swapper
        return right + left;
}




function encrypt(plaintext,key) {
        var i;
            // get round keys
        keys = [] = getKeys(key);

        // initial permutation
        plaintext = permutation(plaintext,IP);
        console.log("After initial permutation: " + plaintext.toUpperCase());
        console.log("After splitting: L0=" + plaintext.substring(0, 8).toUpperCase() + " R0=" + plaintext.substring(8, 16).toUpperCase() + "\n");

        // 16 rounds
        for (i = 0; i < 16; i++) {
                plaintext = round(plaintext, keys[i], i);
        }

        // 32-bit swap
        plaintext = plaintext.substring(8, 16) + plaintext.substring(0, 8);

        // final permutation
        plaintext = permutation(plaintext,IP1);
        console.log("cipher Text "+plaintext)
        return plaintext;
}
function decrypt(plaintext,key) {
        var i;
        // get round keys
        keys = [] = getKeys(key);

        // initial permutation
        plaintext = permutation(plaintext,IP);
        console.log(
                "After initial permutation: "
                        + plaintext.toUpperCase());
        console.log(
                "After splitting: L0="
                        + plaintext.substring(0, 8).toUpperCase()
                        + " R0=" + plaintext.substring(8, 16).toUpperCase()
                        + "\n");

        // 16-rounds
        for (i = 15; i > -1; i--) {
        plaintext = round(plaintext, keys[i], 15 - i);
        }

        // 32-bit swap
        plaintext = plaintext.substring(8, 16)
                + plaintext.substring(0, 8);
        plaintext = permutation(plaintext, IP1);
        return plaintext;
}




// text = encrypt(plaintext,key)
// console.log("cipher Text "+text)
// console.log("-------------------------")
// console.log(decrypt(text,key))

function runEn() {
        ans.innerHTML = encrypt(plaintexta.value,keya.value);
}

function runDe() {
        ans.innerHTML = decrypt(plaintexta.value,keya.value);
}