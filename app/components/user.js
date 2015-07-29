'use strict';

let template =
`<div v-if="userConnected">
    <div class="userCredit">
        {{ currentUser.fullname }}
        <br>
        crédit :
        <span v-if="currentUser.credit - totalCost < 0" class="invalidPrice">{{ currentUser.credit - totalCost | credit true }}</span>
        <span v-if="currentUser.credit - totalCost >= 0">{{ currentUser.credit - totalCost | credit true }}</span>
    </div>
    <span class="userBasket">Panier : {{{ panier | basket }}}</span>
</div>
<div v-if="!userConnected && sellerConnected && sellerAuth && lastUser && lastCredit">
Dernière action par {{ lastUser }} pour {{ lastCredit | credit true }}
</div>
<div v-if="!userConnected && sellerConnected && sellerAuth && !lastUser && !lastCredit">
En attente d'un étudiant
</div>
<div v-if="!userConnected && (!sellerConnected || !sellerAuth)">
En attente d'un vendeur
</div>`;

Vue.component('user', {
    inherit: true,
    template: template,
});
