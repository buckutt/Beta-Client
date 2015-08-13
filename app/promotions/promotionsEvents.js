'use strict';

// Revert promotions to article. Useful when removing an item possibly in a promotion
vmBuilder.methods.revertPromotions = () => {
    let newBasket = vm.$data.basket.slice();
    vm.$data.basketPromotions.forEach(promotion => {
        newBasket = newBasket.concat(promotion.contents);
    });

    vm.silentBasketOnce();
    vm.$data.$set('basket', newBasket);
    vm.$data.$set('basketPromotions', []);
};

vmBuilder.methods.onPromotionExpand = e => {
    console.info('Promotion expanding');
    let $elem = e.target;
    e.preventDefault();
    let $menu = $elem.nextElementSibling;
    let $menuContainer;

    if (!$menu.classList.contains('mdl-menu__container')) {
        // Init the mdl menu
        let menu  = new MaterialMenu($menu);
        $menu.MaterialMenu = menu;
        $menuContainer = $menu.parentElement;
        // Fix margin left not applied
        $menuContainer.style.marginLeft = ($elem.offsetLeft - $menuContainer.offsetLeft) + 'px';
    } else {
        $menu = $menu.children[1];
        $menuContainer = $menu.parentElement;
    }

    // If there is a click elsewhere, just hide this menu
    document.addEventListener('click', () => {
        $$('.mdl-menu__container.is-visible > ul').forEach(menu => {
            menu.MaterialMenu.hide();
        });
    }, false);

    // MaterialMenu activated to $menu is now the container
    $menu.MaterialMenu.toggle();
};
