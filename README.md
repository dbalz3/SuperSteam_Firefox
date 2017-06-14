# Installation & updates #

## Recommended ##

Go to [Mozilla add-ons](https://addons.mozilla.org/en-US/firefox/addon/supersteam/) and use *Install* button. Firefox will take care of keeping your plugins up-to-date.

## Advanced ##

### Windows ###
(TODO: someone please fill this, I don't own a Windows machine)

### Linux & Mac ###

#### Installation ####
Clone this repository:

```shell
# if you don't have one yet, create a directory for all your future projects
mkdir ~/Projects

# go to your Projects directory
cd ~/Projects

# clone (shallow) this repository
git clone --depth 1 https://github.com/dbalz3/SuperSteam_Firefox.git

# go to your Firefox profile (replace *your-profile-id* with correct value)
cd ~/.mozilla/firefox/{your-profile-id}.default/extensions

# link freshly cloned repository as a Firefox extension and give it a correct
# extension-id (just copy & paste *jid1-rVta...* value from the next line)
ln -s ~/Projects/SuperSteam_Firefox jid1-rVtaVpAqPk8ggQ@jetpack
```

After next run Firefox should ask if you want to proceed with installation.

#### Updates ####

```shell
# go to your clone of this repository
cd ~/Projects/SuperSteam_Firefox

# pull last changes
git pull
```

# Contributing #

You can contribute to this project by sending pull requests or testing extension and posting issues on GitHub tracker.
