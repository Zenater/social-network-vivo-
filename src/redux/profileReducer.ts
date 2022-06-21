import {Dispatch} from "redux";
import {profileApi} from "../api/profileApi";
import {stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from "../components/Profile/ProfileInfo/ProfileDataForm";

let initialStateProfile = {
    messageForNewPost: "",
    post: [
        {id: 1, message: "hi, how are you?", likes: 12,image:'https://www.soyuz.ru/public/uploads/files/2/7475348/20211117124509ab01a89ece.jpg'},
        {id: 2, message: "It my fist posts", likes: 11,image:'data:image/jpeg;base64,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'},
        {id: 3, message: "it's my dog", likes: 7,image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYZGRgaHBoYHBwcHBgaHBgYGBgZGhgYGhgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQlJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBFAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xAA9EAACAQIFAQYEAgkDBAMAAAABAhEAAwQFEiExQQYiUWFxgRMykaFCsQcUUmJygsHR8BUjkiSi4fEzQ8L/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EACMRAAICAgICAgMBAAAAAAAAAAABAhEhMQMSQVETMiJhcQT/2gAMAwEAAhEDEQA/AOQAc+pr1RW13b6mtQaASRRRVpQOaGWsJJpWjDVMSorHxSmlotmtdBodUaifE3BNbYNdTCh9BpvlKqNzReEJN0iw4fCJoloFVLO9OuF4o7NcxIOlTSJ3JMmljGhOOLTtni7UQlyo0E1Jopmy9Hj7158Op0SpVShYaBAlSLZmixanitksNMRQswKuGozCW160YmWXCCQpMcxvHrHFaLgG5ho8dJj60ryCSsFxdsdK3wabUTZtjrWz6RxQvFCV4BsShM0t+HvTHE4kcUtdyTTR0NRJoqewJEUMHNb2bneo0FEOJswah00ZmBO1BITTIzRsxqMmpPhmtls+NY1GiPWO09KY4PCiZNHXLCDb61rQerFeEtKPmG1e4jLh8yHbwom4BG1eWGrWagBcL1NbMUG1OreCZgSokUtxeG01tmvwA6KytqysY9xVvc0PbTem2PtcEUBYTetYpsqUVh8PvXirRdg70tmRKMIIry3hRNFltqlsqOTQsIoxlsLQiMRxTDHuC21Ahd6JjR0mh7lqKP01oyTRswDb2qYGsuJvWgFYyYVban+VZMLgkuq9SWiFHidwT7UjwNks3E1YMdce2lu2oYu+4VRJ/dA6knp70GMkMf8ASrKW/iOxQHWEmCbjJMgqANCmDBLTsdjBh/2eyg3xrTD6FAlHcAKzRuepYHxAIpvkWQjSi4hFd0AZiwkBz3giyTsgO/ixJq2/HVRzQi0yi43QgbsvcZIF9UuSSrKpIE7lSJEikGadmMcAdOJGrb5EdAekkQRV0v5uF6bUGM+XcnYeUfSi5RKR/wA8t0cyzXB37SprVMQGRQ+yoyuQCQjCOJUTySDtHKg5arKXRnAmGV10skRyJ4538q6J+sO9/XoT4WgorArO0ELcG4IYEkeG4IA5DzDKFuEth4S+Bvb/AAXQv7AYwp6RMenVU7FlwOm0cuxWH0tzWtpB4U/xuXa2JChIkMu8owMFWncceFRWctg0exBQYqaz5VmFwctNWQ5Q5HdHNT4XKmXdlNByKKBXcZg5gRXiZdA3FWo4RS3FQ4/A+G1ZSsLikV/9UAE0ItuTFWbDZaX2miMs7NsbkbR40ciuhLhcuYjYUQmUczJNXtsuSysEUlvugnpP5UGpDKivnI5QsPYUnTDkMRHFWRMcwlV48ak/0glC/JO9FXQroT5dizbaCJFPkyK3iO9uJ6Uot4UknpU1tXQ90sPc06YjSEmadnzbuMo4FZTe7ZZjJBmsrWGkLcVYCqTStbcGaf4/DkyPSKU3rZG1IhWiJKmSoX2ExWy3PKiBBvxIqC/jY2rS8jxIFAXrTzxQVDNVsnW5Jk1KXFBph38KnTLnPQ0XQLMa6KjOIniikyVzzNGWsgYVrRhUthjUpsMu5U1ZstywAy9G5mLQWNqXtkfpasQZRZDsF23MmdthxxzVyyiyn68brbjC2WuNye/GlQB/MY9KVYVVVSyjx8N9o596tRwotKq//ZiHRnj9gA6E+jFo8XFTnJ+C3FFNpMseHY7KTvEt5k7nfoJP39K8xN7fbYCorY0LB+Y7nefv/m5PPJBxcx0/m1H/ALF3NFOlR3Qgm7B8dcO8uAPNufb+lKbuLie8pG/7Yn+YiDW99Lh5dwv7ipaH/Mtq+lLcVg5B3b+a4zEn3T+tAtmsE+BzW6tsotxktI6qAia3drrFlQs3cC6ge8d4IHr7ezJZDN3WBBDDZZ6agfkPrt5il2DxiWLOIRmY3H0fDBBYKV16n5IOxAjzJgUss4+V0tDgbAqyax5QDv6EDzmmds5Ifi34yWbtBaZ0/WrSgvEXE4LqvO45YDfzHmDUOWKLiJcUABgD9RS7JMU6EqpLWz+FgVZI40yIIHlIHTiKsvZ9AAyEDSGIXyBAcD0ho9qyV4J8ySVoa5VbSN9/asx9pD3QIo3DWlHWKhzCyApK7mnpUcvZ2D2snQDVQ+Iy9SdgK8wwuOIOqjcNgXG8Vv4a72TYLK0USAKEuJ8N9QH/AIpi11lBnakrlrjEzA86OWK8HuMxKuw1xFKc7wquBoE+lFYrBTtP0qXDWgibijTB2QmsYVVA1ACj8PfGnSp2pgcIl1YioMPk62nn8zRUWByQHbwwk92tlwmqYXerNbRP2Z9qLVFUSF+1OuMm5lAfCXJ+Wsq2YkOWJC7VlN8aB8jOYZvjAYC8wJ+lD3bY0gnrTXF5erKmjkgUNj8Lo0p1rmTR00Kvh6hABNF4PLpMkbU5w2XQoaiESB8sVnK8IGgG5aBgAUxwmW2yBqAqEJNbKjA9aFGf5bGX+lWuQtFWMJaA4FAjGKFgkk0re+xYldvekSs3R0PMXbReKGe6scUs1ufE0dhMC7xKmKoomSSE2Z33JhKBtYd2O8mr2Oz5aNqY4bs8BuYoqLfgLkl5EnZ7KFY/7ki2g1v/AAJuV/mMD3qe1dNzFqzmSbt14gwpC2VVfDYD7Uxz66uHt2rIHevOjP07oYaUPlJ1VVMLmQW9aZlLBnvd0caviIo1Two0sTz6TAqTTstxSV9mdE+IG+XvHqw+UeAVjz7UDmGJCDaPUkAecmkGBz3E4i9ctMFtrb0k6DrZlJYfOdgDA4AoDH5a96zdxQZEFsuFRl13HKeOo92frWSt0jq+ZRVhONzBzusEeIJI9dtqrGZZmwO5Pj6D1qwdgUfEh0ugaTIBAiNvKkPafs89u+QFLoD8sxPhPiKy+1ME+eTVxF1vOJ21NHmzgfapbuPZSpKDTIk63O3oCKlu4R8TdT/ZCKFVCAdoBO4Cgb941Ys4yBEw/n96ZuKeCEZ8kk7wS4FVRQ+gOrRCjuMJ4hzq1GeJ0g8c7VbckFu80QQYJEjSRxKuCZ1x16getczyXNSUCHeJQ+h538NvvT/stmLpiu9spIJmeT3T4x1PSljKpUxJtyjs6nay1AKIXAp1FS2sUkbGgsfmip0NdmDjbfsmOXpOwrxrIXgCk6Z+uqAZNHpjSd4rYYFIW5phXadAqvYS01tiHP1q7NjhHG9VjML+tisAk7elI16GUvZ42ggkEGorOFDAlmMeAod8tdVMHkVWsRYxSlhqOnpFBOnkMtWi3pi7NraR9aIGJS4uoEVzG9h35IafevBnF22NAmPQ0XJ+BKOlYfPbKd1iK8u9o0JhBIrlqreud4BiPGnOGYooB5plJpZFcS//AOsL5VlUY4zzrKPdgoPyrCakV+QB/SqzmdwtiRPANW3KcyRLCpyY3pNn6oAHXnmuRbOzaCVxICxUbY5dJqsXc1IqNMaXMTTKLEUnZZ8nuh3MnaadYkKdhVSy2UM1Y8nvBn3o1mgSkokK5Kzmd4pthciUU4tECpbTCdzVYxRJ8kmCWcsVelNMPhlHArVMQs0bZcGnSSFtm9tAOlEKg3J+VRJ/oPeowKHzFHZAiGJMsfE+HoBQk8UhorJQe12L1Y22Tvx9SWA29d6ruLbSllgOHuwPAa1bc+pb6U9z7ClMTbDGSdR9lVj/AEFI77E2LQiSWvRt4upG3uP8NcreTrivxH/ZDElcxxC3BGu3q9lddP2b7Vcc57N4a6QxtoWmZ2E9Nx41y+3mqpjrF8Huuqq3kCArCeDuJ9q6vhMSGFK31f8AS0Y9lfolyfApahVAEbmNoE/59KRdo7iPcJV0OnpMajJ2ovNcO7W7jfEa2AVjTALaZkSQRG8cVyrMMTrvamVgqNGzEieZkc/+KyTaoZtJ3ZZ2xKxqSBPlBFK82xLlILEz40wsvbdZQjzH9qSZzdgfWp07odyXXBWMHfOuN+vHrtP96vGQ4rWhYxrTgxMidgQeu1c/wyS4PHNWzstcMXNxKgsIkzAmI69dvOuia8nFF+DuuGtoFUgcgGfWvMyZNMEc9IqTIdLYe0w4KKRPMECp8XaUjfmuqLRyyRW1ytdWuKNRwSFFFphix3Pdom1hkTgUWkgKwVsLA25pcmB0knrTx2ocxWMKXsMaEfBuTEVYVI6Co7uJVeaVxTD2aK7cwCqJZRWjZZZdZZAKkx2ZozHeAKQYztEgMFuKDaia+w5sYW2i6VUb0jzLBLJJ2qAdokYbGkua5/qUipuTYyVEN3CiTD7etZVWu44ye9XlamEtvZi8GDBug/OtM94j1NA9l7oBYHxA+lMMwOu9p6RUpKpF45RVcVblZrzAmN6cYjAaSV6dKWXU0bVSMkxHHNjTCYrVNNcHiyp7u5qrYN96uPZjC6m1EbUJVROY1wuKvv0imVnCufmaj0QDgVJcMU6UiODbDYUDnemNuBxS63fnaj7R8qZIYMt1sxj61ArxWjXxWbVDI5v2nxfxcdb0zoUug89mU/cGk2hmCJBkXMQknaNSIVHkdpqTGakxKr1S5p9QeN/SPpUdvHaHYOVKi+SGPRtOkmeuxH0rly2dtJI8xHZ/TgxiDcUBNRQAMTJuQoJmJkOeOXA6VcOxmbfFQE8xB9QNj9PvXPLbXbzXLHxGNtQ93T+EOgJmPY/+6J7FZjdS44VS6qNbKPm0SJKjqRM+5ppxco/sPFNRlnTLtmWcX8Q5tWkGhREtAVd41Geeu3lVYzTBog0G/qZZMAbT15mauOBZbw1Wyulu8WWJIPjVa7T4O0H7jAkDf1HNLF2WkqRWQ7o0q/02onOcVrtA/iIHHia8fEW1XpIpHj8brIA45PtTKLbISkkmTZaqydvlHJ6kk7U57P3dBY8HWwPoUKj7xSrBWGCM/BJ5kRt1k1LYuMhQmIMkGIlfPx5jxG9M8tk1ijv3YfFa8HbgyVXSfIjp+VOXiZNUbsBi9Re2wuI6KpGskgWzIRVU/KDBMzvHkKtGJ+JuDx4jg+9Xg7Rzciphz3wOKFu4jwobDW2HJrTFYhE3JH1pydm1/FMOKhbFwJYxVYz/ALXoghIY1S8V2lu3DvsPImg2kZJs6Niu1KIdI3NV/Ne0jsdQgCqlax6jc81DjMWCNjSuQaCMdmr3THHpQd63qEda0wtwiTFTWTqaIM1KV3YwG9ooPm3pdfxGoxVkv4DaTSTE4RV3JoJ2MgE2zWVbsB2Wd0DEc717TdjdkIstu6DPn/anGYg61Ydf/dVqw23vNWTGX4RGHlSSWS0Hg8vXjqE0Pcs6nE8GmeLVPhh43pflV74jgHgVNOslHsy/hAp2+1OcmzIoQkU1sZSoOuaB0qL3dFTfIS5qLtgAXGwok4FuWFbZFdCpLRU+KzINstdEZtxuzmoXvYA4oq3iJWKEIY7is0Qe9tWcv2FEzXfGgbNt3fwWftU6os7natc1v6LZKbaiEn+LkjzgGlcsFIK5JFL7QohxBKyTrA23kqpEx6/0qpZyw1so63W8uSDx5zXQHwJZ3uGI7yJvEQQo9zJk+B9KonarDstxnaQpYqNwTNuEaB4Spil43nJ1z1gsGVYWXxFzSCEw90bbydBIHtxHnSz9H2IFp79wgELbWWMd0SdR36GDTfH3jh8AQDpu4iSBtK2U7xmPGD/yNUzKrxCXUAgOEBPkrMYnpJiqQ06J8itUP8uusyM1lyg1vA/dLEqp8NopFmj3jc0sDr39/Ejypl2cuaWe2fxjUnqOR9KOzC6GuWWIg/7in+LTtP50E6lRXqpQTsqD2HJ09fCtDY0kz/nv9asGDtancnnRPX9qB+VBXcKHuIhMSfyFOpZJuFKybE2iLdtD4DqYJncT4b1scNKKS344HSJMbDpwPp5VJmlzSyztpBb7HoPM1JgjqwyyNlMnxIBnYelTvFho7LlmHuX21RosqAinq4TaR1IJnfzp0uBCfIhPnrIn2G31pbgNfw0IYzpBjwkUxsNdiXKhBuSYBgVZHPJ2UjtZhcxRn+AdaDcaY1RE7qeSPKa53isxxMH4jvPBBkEHwI6V1S3nrlmZGDq7lgG4RDOkRzMaalx64bEJ/wBTZB22I2b2YEMvvRfaxeqo4Y1xiZkmp7N4gRFWvOMhy9Jazj1Rpg2r0sR6Oikx5kH1mll3BKkNqR0Pysh1I8c6W6kdRyKBngVW8MzVOMCwIJpr8ddMCNqAvYwGsDLJ1dEEtUyZoi8LSK/dJ61qTtWaMkWBMV8U6RSzMsvUOpLggEE0EcVpSBsfGl9/EMeppUgpHUMP2ht6VAiAAOfCsrmVi80VlT+MHVE2XwWINObbarEfsn8jVfwzQ21OMmbUjoeRNUkWiWLBW1uWYPhVedTackcVYuxbB9aHkVp2qwQXioXUqKbVguWZu7EpO1E4Fi94yeKrWCRtcirHklo6ySaXkilbRzyeclzwyNABbu0S+JRNpFAJiVVdzVfzHHoz/NxU4tuOBWmXI4yB3d6wOW3Y1UrGKbT3ST4U7y0OF1MZpotvwbQya4CJ4ihnm4IBiDq85HhPXcj3qNrykkExR36sid8uAkxMgjfqDIHtzVmlQYJ9rQmvOWe9Yc6VNsOCBJEll0geMwfeue55dm6wPCFjpbvLOrfuk7yefGunX7qH/cT8RMnmVQMQJ9SJ9a5fmoVmutHeLbDpDcz57j70vHs7JO0T9rsYz3Ffdu6DH7umSIHCwY8BFJUskMV3I5nxCwP/ANVYu1mCCWrDW9MsgDRHe23M+A4Pv4VXMReAZmHQFQfYL/QmrxWCTeWFaWtol7UdSsCo8gQCJ8wTTHOLg1JcHyPpceRHMz71LmuEH6uQT8sH8p/pRGW2FexpdZAJVTE6S7LDcjYSfH0NLJ00ynHbTQXiMKqtrQ95rbLpjuqiFWLl+ByZHlNIbK68SpRSwRC7fwiZYjoNx9qYdo7jB9G4WEQTsGl+9J5iQv8AwrXIb6W7d669ouHJRGDIgBUQSof59o2AMSayWLDySzSE2YEvcIggmBpIOwJmd/4efKnODXRa0neXAPHdECT+f0pdgLod2chgFJgksxIE7Enn5h16UZld86LzgzuFHjJEtv0kAChJYoWPs6ngu2uAtIuvEpxwpLngchAaB7R9t8NibJtYW7rZyEI0uhCNOswwBiBEjgkVyHGWBoAAiX461a8hwCIS0AaF355gnnrV4paOdllV1SEHIEuY2npP9povCYC/ivlGizMO8xIiSq+0T4T1PFby0NdA0CXuPAHmTpWfLjfpua6fdwwsW7dlT3EWPAs3LMfCSSZ860v2bxgpWa/o9w1xDo1K44aZM+YPIrml/C3cNcfCXpUNG++kme5dXykQT4ah0rvLXdCid2O4UbQP2ieg+5qtdscgGMw5KhRcSXtmOT1SeoaI9YNAVM45+tOsg7ESCPAjkVoMQT1rXFgmHM94QZ51rswPnwT/ABUPWoYPN4DrXiXJ60DXqmtRqC3ceNQO1aVqa1GJ7F+BFe0NFZW6oAXb2aaZ5W+lyejUtw1suwFNscwQovjSy9Dx9jbI73wsQG6NtVp7QWBcWRVGuOQAw6b1dsE5e0r87Vz8ixZWL8FcTKXQ6ulTfF0AxzVjzO+vwo4MVS7mLAMGppOTJTSUgnGY5xbJPJqt2lJcSeTvVgxLK6QDQGGwxBnwq0aSBRYMRmAtqiIN4r25n7oNyKS7yXcbDikuIuaiTJimjFCja5nLs5MwKKw2fXLbalYGRBDAMrAbgFWquI0V61wnYCqdEMi6pn93E3rdtyoU7BVXSOCZ252nyqqYtyjueBqB9tUgVYv0eWGOIe4R3bVi9c33AbRoXb+c/SkWKtSlxtQlXtr1nvBvD0pOqTKKTaCMxzA3MPZ1KO6TbJ6nQZEnqCDMeM1XbnEfX86tVzUuX2hOzvcJG28FQDI52JpCuDJUMBIWdUdNzBP+dKZNGastWaXAcGjgb3En0h7Kfnqp9gMPat2QLkQykkbkkHnYetVzEuGweCj9i4D6rikmf88KtK2gL5Y/itoqTxCsxcA+PeX2qfI6L8CwVbMME9zXeWQFB0l51sII1aekRz7xUGZqqYezaRm16RrQbgliSrE8DZvlkkdYk1aMzCr3DCwNbLySkFnJ9QH2qn9oscnx5RSgG8atRERCkwII3Bid153mtBticiSZLawyrbII3RCgiPmaGdoPWYHtQeGfRh2MmWcaj4hV1Ef9w+leY7GG2qIBuRqZjzqbcj0HFaPeZsPbXYhnfzJOodOnSnSbFckjDJNoE/M2o/nVkx13RhnYfiJEzPO0fakWIgYhF/ZEb+UTTPOEa4tq0pguyIvh32Cgke8/2q6vJznRv0d5QFRcQ37Itpt5d4/mJ8A1WHNbyo5cnU+2lei/vN/aicPoRVRI0ooRfAbRv5wJPt40rzKyA0FoHzMxO5J3JqcnZqAURnJYnblmPX18vKpMNipMAHSOPPzjoKje8GAEFU/Co2Zz4t4ChrhOoeB4A4H96CYrRzr9IOVixiS2n/ZxPf2ju3Bs5Xzkho66iPSnX7JUwd+oI4YHhh5f+q7H20y79YwTgCXtf7qnqdAOtR6pq9wK5ArkoVO4HeXyJIBA8iDx5CmsZA1epWRUqCKISMivK3ia0fasY8isrTXWVjDrLXCsSa1xHfcs3tTvEWrScRwKDXQwI+lSUrzRRxrBG1waRvtXVMisKMKrdNNcmXCnidprpuUXdOD0k9KXkDEq+d5qGcog4NV/HPBkijLaKbpNZjWR20ttSRSTJSeTTAEMKY2QF6STS/DoEO3FNFvrsaE7BdibPLrBtIpOBTzH2g7FiaFTLSQY3q0GlFBYvVaOw2kbxQxtkGIoqxaNNJmOidjsMyYPF3uNdsBRHTvdTtJ8PCPEVQQg+BfubQzhQfE7zt6TXVcYjW8rIVQAUts87HvAf00D2rjWKsdxHndncR4CRBHh1+1KtlIrBY8UA2Bsro0jvNqE/MWI8I8B7Uqyi8y3GYcfDYkdCswAZ8yPrTXGN/0VpZbVqaB+Ed55iPxfKZPQCgMRptoqnm4qsR10D5F8gTLnx7o8aVK1Q2nYwwuGN7DMtsE/CfFbfuutp1H/AGvt5GnuX5qDYVzvGkHk7gQIH+c0u7AYgI+IQna7adgf3reqQPMpcc/y0FlGBa5be2JlHJA8YBgfQ/ehyxxkpwy2F/rVsreu3SwNzUi6Nzuu432jS0GSPm8oqr4Cybl5nAgL3u8ZhR+EmNyYj3NWrNcKFw1privLNc+QAKp7q95t4OxIXk+NVg3QiEDZnM6Rzp3CLsduQfc0Y6Fl9sguYubh1DgGJPn/AIPrTzA5fpTDsZIJe4J2kLwR4CVH36RMmBygMtpWIUKDdulvwqeGg+yx4kUxxF4EM7bLp0JO/cXr6lqrHxRKXmyqYq7OJ1eZ/OnCYsHEYVidlu2SfQXU3+1V/F//ACL/AJ41NdlhGqJKgEnZZIGqfAc+1PexPB9C4NJYN+AKHY+oB+sBR7VWcxxT3brETu3dA+1WzHlktBEUaiNhwFA5dvP8qqAc6/hWTLn538B136D86lIKCEaO5Ae5+wD3U83YfkKjvPAKhgzxu2wC+SjpWupUHw7ZH79zifGCelD91T3Q7gdQDp/5GBQFkGYS7ET12361yDtFl/6vfu2QIUPK/wABAdPs6j2rqZdokLABmZH9KqX6RcGWW1iVEgTbc+8p+bCfMU0WBFB61Lq6VAea9LxTjEjmKgYzxWFixqVErGNQlZUtZWMNEtkjc1sEFQlq1PrQo1sNS/VnOYn9XKqd4iqSXimmV4nfSeKnyRtWUhLNMUJfZHM+NGXG1metT5xgB8y0qUstFU8iyVMNR2U02w260ns3JIptZIU0k0KL8YxojLLjDrWYpeajwvNNF3ELGPwUJk0yyvLlvXEtLEuQo9+v9aT4hgSIq6foqy8viXun5bSbfxv3V+wf7UKvAtYLnm2FD2MXZGwCIq7TuqnTA/lFcHxaaRbSeiuf51DAeoBj2r6CxbgXL69WQH6GJ+9fP+d4Z0uaHILARInfw+oijiysb6j3OGVMNZRWJ77u3hGqCpPMbVX7WIZ2c7NcILqW41AgnrzBIA8hVh7QWgtnDgn5i5AjhXc96Z29PA0lwGHVClyQXcFAnHdmGdj0BBjz3o8YJvJZMkvEWy9u2o+IO8gOkm+GnbVuoZZgDYd4bU7KW0BVYR7hIZgN5IgqoHCrpAnrFVsYFLQV2dndWVpJ4UOkwOAdM70bgMWb+JEgzqPHHWB+Q9qXlVobhwyLP1NorbLAgoIAOrpO4nmCYnxFV3H3EDW2HyrqUxsT1iff7xTbtviyL8Mg7uwg8iN56zPj4VWXUBVY9dx5SeP88K0I4Q0pXY5weKL7R3JDd7YHSTDMBuwGowvnUmMxEo3Eu0cDZF6bbCSZgDbbwpXbxfdbzEAeFbviNlE8Dx6nf/xVuqSwRu3kDzBYZT/nNTWryq9tnkorozjqVVwzD6A1BjmkVvgrQuXLSMSA7ohPUKzANHnBNYB3bOMS7jQvdEDW5/a5Kz1ApRh0EMlvuJ+Nz8z9CF8vOnV2219xAlB4AhRvuSTEn/JqXKMIrF3gaVJjjp18KnVsa6QBZwMDuIAukQzefXcH6gGhDZDse8zbge5I8ZP0in+dXNKHf5tgP6/nQmSYUQXb5VlvpRomwEgA3ANhbMTySYQbz/NVb7QzfwzpyWVlA/ftEukfxKAPpVjw7lrWJeNyS31n+1IXeHdVEToceukx91Ue9DRkjjpaoyaPzvDC3fuIPl1Sv8Ld5R9CB7UABVAmyNUyvWsVqVrBJPiV5UMV7Wo1husmpEU+NZWUQEgr1LsGRXlZSsK2PMMfiIZ5quYliG01lZU4bZR6QRbbYHrRVvEEkeVe1lGQjGLgMpoVSBtWVlSiEiuOQZrrX6HUb9XvNtvdA9dKL/esrKrEVh/afG/BxBfkfDbbz0NE+8VxjPsV8S8XHIfSJ/Z2KE+exnzrKygtll9Q3tHjYtWdXeY2wTtAhyxO/M94Ch8CFIW4ogkAR4QoB+81lZTR0Tls3xmYwsaYJBBmDO8fQjepez+JZVa4BqVSureCA2wPnuPyrKytyaGh9hX2hbVc1gQGkjj6beooDUTbA5Ctx/nvWVlaP1QJbZumI22UD7mthc69TufesrKdCMjvNUmXXYvWW8LiHb+JZrKyiY7zi8yKIqrMQVG/B6/nTPJZNlQF23J3G9ZWUiM9C7Pbk3AOIH51NmVz4WFCjm5z6daysoewANju4a6fHb/PrVPuYkJftgiQyFdpEENKken9aysrMyKX22sgYgEcFB9if6EUny63ba4ouuUTfUQuogAEiB1J2HvWVlMtGHS4TL+Dirnmfhnz4Gnjj77HadLmEwH4cTcIkcowIWRqA7kE6Z3kbiIIMjyspjC/MbOGVgLVxrixM6SsGTtBHp9aysrKxj//2Q=='},
        {id: 4, message: "Hello everyone", likes: 4,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNslP7-_P7jz5MrT5yhW14y_IzBDbZZT0ag&usqp=CAU'}
    ] as PostType[],
    profile: null as ProfileType | null,
    status: '',
}

export type InitialStateType = typeof initialStateProfile

export type PostType = {
    id: number
    message: string
    likes: number
    image: string
}

export const profileReducer = (state = initialStateProfile, action: ProfileActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPostText, likes: 0,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNslP7-_P7jz5MrT5yhW14y_IzBDbZZT0ag&usqp=CAU'

            };
            return {...state, post: [...state.post, newPost],};
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile};
        case 'SET-STATUS':
            return {...state, status: action.status}
        case 'DELETE-POST':
            return {...state, post: state.post.filter(f => f.id !== action.postId)}
        case "SAVE-PHOTO-SUCCESS" :
            return {...state, profile: {...state.profile, photo: action.photo} as ProfileType}
        default:
            return state
    }
}
export const savePhotoSuccess = (photo: PhotosType) => ({type: 'SAVE-PHOTO-SUCCESS', photo}) as const
export const addPostAC = (newPostText: string) => ({type: 'ADD-POST', newPostText}) as const
export const deletePostAC = (postId: any) => ({type: 'DELETE-POST', postId}) as const
export const setUsersProfile = (profile: ProfileType) => ({type: 'SET-USER-PROFILE', profile}) as const
export const setStatus = (status: string) => ({type: 'SET-STATUS', status} as const)

export type ProfileActionsTypes = ReturnType<typeof addPostAC> | ReturnType<typeof savePhotoSuccess> |
    ReturnType<typeof setUsersProfile> | ReturnType<typeof setStatus> | ReturnType<typeof deletePostAC>

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let res = await profileApi.getStatus(userId)
    dispatch(setStatus(res.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    try {
        let res = await profileApi.updateStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        //
    }
}
export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    let res = await profileApi.savePhoto(file)
    if (res.data.resultCode === 0) {
        dispatch(savePhotoSuccess(res.data.data.photos))
    }
}
export const getProfileUser = (userId: number) => async (dispatch: Dispatch) => {
    let res = await profileApi.getProfile(userId)
    dispatch(setUsersProfile(res.data))
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileApi.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfileUser(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}
