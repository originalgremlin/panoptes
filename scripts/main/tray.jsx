"use strict";

var app = require('app'),
    i18n = require('../util/i18n'),
    shell = require('shell'),
    Menu = require('menu'),
    Tray = require('tray');

module.exports = {
    create: function () {
        app.tray = new Tray('./assets/images/main/tray.png');
        app.tray.setToolTip('This is my application.');
        app.tray.setContextMenu(Menu.buildFromTemplate([
            {
                label: i18n.t('Open Panoptes Folder'),
                click: function () {
                    shell.showItemInFolder('/Users/barrys/AeroFS/AeroFS Team/users/barry/Panoptes');
                }
            },
            {
                label: i18n.t('Invite Coworkers to AeroFS...'),
                click: function () { }
            },
            {
                type: 'separator'
            },
            {
                label: i18n.t('Preferences...'),
                click: function () { }
            },
            {
                label: i18n.t('Help'),
                submenu: [
                    {
                        label: i18n.t('Report a Problem'),
                        click: function () { }
                    },
                    {
                        label: i18n.t('Support Center'),
                        click: function () { }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('Network Diagnostics...'),
                        click: function () { }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('About AeroFS'),
                        click: function () { }
                    }
                ]
            },
            {
                type: 'separator'
            },
            {
                label: i18n.t('Quit Panoptes'),
                click: function () {
                    app.quit();
                }
            }
        ]));
    }
};
