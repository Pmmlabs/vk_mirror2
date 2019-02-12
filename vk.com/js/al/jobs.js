var Jobs = {
    view: function(id, e) {
        return showWiki({
            w: 'job' + id
        }, false, e);
    },
    addVacancyBox: function() {
        return !showBox('al_jobs.php', {
            act: 'add_box'
        }, {
            params: {
                dark: 1,
                width: 550
            }
        });
    },
    addVacancy: function(html) {
        var el = se(html),
            listEl = ge('jobs_vacancies_list');
        listEl.appendChild(el);
    },
    deleteVacancyBox: function(id, hash) {
        showFastBox({
                title: getLang('jobs_delete_vacancy'),
                dark: 1,
                bodyStyle: 'padding: 20px;'
            },
            getLang('jobs_delete_vacancy_confirmation'),
            getLang('global_delete'),
            function(btn) {
                ajax.post('al_jobs.php', {
                    act: 'delete',
                    id: id,
                    hash: hash
                }, {
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn),
                    onDone: function(reply) {
                        if (reply.error) {
                            topError(reply.error);
                        } else {
                            Jobs.deleteVacancy(id);
                        }

                        curBox().hide();
                    }
                })
            },
            getLang('global_cancel')
        );
        return false;
    },
    deleteVacancy: function(id) {
        re('jobs_job' + id);
    },
    editVacancyBox: function(id) {
        return !showBox('al_jobs.php', {
            act: 'edit_box',
            id: id
        }, {
            params: {
                dark: 1,
                width: 550
            }
        });
    },
    editVacancy: function(id, name, text, ordering) {
        var nameEl = ge('jobs_job' + id + '_name'),
            textEl = ge('jobs_job' + id + '_text'),
            orderingEl = ge('jobs_job' + id + '_ordering');

        nameEl.innerHTML = name;
        textEl.innerHTML = text;
        orderingEl.innerHTML = ordering;
    },
    toggleVacancy: function(id, hash) {
        var linkEl = ge('jobs_job' + id + '_toggle_link'),
            uploadEl = ge('jobs_job' + id + '_upload'),
            disabled = intval(linkEl.getAttribute('data-disabled'));

        uploadEl.olddisplay = 'inline-block';
        ajax.post('al_jobs.php', {
            act: 'toggle',
            id: id,
            hash: hash,
            disable: disabled ? 0 : 1
        }, {
            showProgress: function() {
                show(uploadEl);
            },
            hideProgress: function() {
                hide(uploadEl);
            },
            onDone: function(reply) {
                linkEl.setAttribute('data-disabled', disabled ? 0 : 1);
                linkEl.innerHTML = getLang('jobs_' + (disabled ? 'hide' : 'show'));
            }
        });

        return false;
    },
    showInlineProgress: function() {
        show('jobs_progress_inline');
    },
    goToPage: function(el, e) {
        this.showInlineProgress();
        return nav.go(el, e);
    },
    declineApplicationBox: function(id) {
        return !showBox('al_jobs.php', {
            act: 'decline_application_box',
            id: id
        }, {
            params: {
                dark: 1,
                width: 550,
                hideButtons: true,
                bodyStyle: 'padding: 0'
            }
        });
    },
    acceptApplicationBox: function(id) {
        return !showBox('al_jobs.php', {
            act: 'accept_application_box',
            id: id
        }, {
            params: {
                dark: 1,
                width: 400,
                hideButtons: true,
                bodyStyle: 'padding: 0'
            }
        });
    },
    editCommentBox: function(id) {
        return !showBox('al_jobs.php', {
            act: 'edit_comment_box',
            id: id
        }, {
            params: {
                dark: 1,
                width: 400,
                hideButtons: true,
                bodyStyle: 'padding: 0'
            }
        });
    },
    deleteApplicationBox: function(id, hash) {
        showFastBox({
                title: getLang('jobs_delete_application'),
                dark: 1,
                bodyStyle: 'padding: 20px;'
            },
            getLang('jobs_delete_application_confirmation'),
            getLang('global_delete'),
            function(btn) {
                ajax.post('al_jobs.php', {
                    act: 'delete_application',
                    id: id,
                    hash: hash
                }, {
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn),
                    onDone: function(reply) {
                        re('jobs_application' + id);
                        curBox().hide();
                    }
                })
            },
            getLang('global_cancel')
        );
        return false;
    },
    toggleSubscribe: function(el, jobId, hash) {
        var subscribed = domData(el, 'subscribed');
        ajax.post('jobs?act=a_toggle_subscribe', {
            job_id: jobId,
            hash: hash,
            subscribed: subscribed,
        }, {
            onDone: function(result) {
                var title = result ? getLang('jobs_unsubscribe') : getLang('jobs_subscribe');
                domData(el, 'subscribed', result);
                val(el, title);
            }
        });
    }
};

try {
    stManager.done('jobs.js');
} catch (e) {}