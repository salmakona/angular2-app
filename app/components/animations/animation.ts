 import { animate, AnimationEntryMetadata, state, style, transition, trigger,keyframes } from '@angular/core';

export const Annimation=[

        
            trigger('FedInUpThree', [
                transition('void => *', [
                    animate(600, keyframes([
                        style({opacity: 0, transform: 'translateY(200px)', offset: 0}),
                        style({opacity: 1, transform: 'translateY(-50px)', offset: .33}),
                        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                    ]))
                ])
            ]),
            trigger('FedInUpTwo', [
                transition('void => *', [
                    animate(400, keyframes([
                        style({opacity: 0, transform: 'translateY(200px)', offset: 0}),
                        style({opacity: 1, transform: 'translateY(-50px)', offset: .33}),
                        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                    ]))
                ])
            ]),
            trigger('FedInUpOne', [
                transition('void => *', [
                    animate(200, keyframes([
                        style({opacity: 0, transform: 'translateY(200px)', offset: 0}),
                        style({opacity: 1, transform: 'translateY(-50px)', offset: .33}),
                        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                    ]))
                ])
            ]),

            trigger('Opacity', [
                transition('void => *', [
                    animate(800, keyframes([
                        style({opacity: 0,}),
                        style({opacity: 1,}),
                    ]))
                ])
            ]),

            trigger('Expanded', [
                transition('void => *', [
                    animate(200, keyframes([
                        style({width: '0%'}),
                        style({width: '100%'}),
                    ]))
                ])
            ]),

            trigger('FedInUp', [
                transition('void => *', [
                    animate(200, keyframes([
                        style({opacity: 0, transform: 'translateY(30px)', offset: 0}),
                        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                    ]))
                ])
            ]),

            trigger('FedInDown', [
                transition('void => *', [
                    animate(100, keyframes([
                        style({opacity: 0, transform: 'translateY(-30px)', offset: 0}),
                        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                    ]))
                ])
            ]),

            trigger('FedInRight', [
                transition('void => *', [
                    animate(200, keyframes([
                        style({opacity: 0, transform: 'translateX(30px)', offset: 0}),
                        style({opacity: 1, transform: 'translateX(0)', offset: 1}),
                    ]))
                ])
            ]),

            trigger('FedInLeft', [
                transition('void => *', [
                    animate(200, keyframes([
                        style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
                        style({opacity: 1, transform: 'translateX(0)', offset: 1}),
                    ]))
                ])
            ]),

            trigger('BackgroundfadeIn', [
                transition(':enter', [
                    // animate(200, keyframes([
                    //     style({opacity: 0,  offset: 0}),
                    //     style({opacity: 0.3, offset: 1}),
                    // ]))
                    style({ opacity: 0 }),
                    animate('.5s', style({ opacity: 1 }))
                ])
            ])
        ]