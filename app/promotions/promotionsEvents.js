'use strict';


// Revert promotions to article. Useful when removing an item possibly in a promotion
vmBuilder.methods.revertPromotions = silent => {
    disableOneChange = (silent) ? true : false; // that isn't equal to disableOneChange = silent.

    let newBasket = vm.$data.basket.slice();
    vm.$data.basketPromotions.forEach(promotion => {
        let promotionId = Object.keys(promotion)[0];
        newBasket = newBasket.concat(promotion[promotionId]);
    });

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

    document.addEventListener('click', () => {
        $$('.mdl-menu__container.is-visible > ul').forEach(menu => {
            menu.MaterialMenu.hide();
        });
    }, false);

    // MaterialMenu activated to $menu is now the container
    $menu.MaterialMenu.toggle();
};
