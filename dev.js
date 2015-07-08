
var nav = null;

function init_dev_steps(step) {
  this.step = step;
  this.steps_glass = ge('dev_steps_s');
  this.steps_glass_c = geByClass('content', this.steps_glass)[0];
  this.steps_wrap = ge('dev_steps_c');
  this.steps_content = geByClass('content', this.steps_wrap)[0];
  this.anim = Fx.Transitions.sineInOut;

  this.move = function(to_step) {
    if (to_step == (this.moving ? this.m_to : this.step)) return;
    var moving = true;
    if (!this.moving) {
      moving = false;
      this.m_height = this.steps_wrap.offsetHeight - 2;
      this.m_g = (this.step - 1) * 140;
      this.m_c = (1 - this.step) * 540;
      this.m_cur = this.step;
      this.tick = 0;
      var self = this;
      this.moving = setInterval(function() {
        self.m_time += 13;
        if (self.anim_h) {
          
          self.tick += 1;
          
          if (self.tick == 3) {
            if (self.m_time > self.h_time) {
              self.m_height = self.m_to_height;
            } else {
              self.m_height = self.anim(self.m_time, self.m_from_height, self.m_to_height - self.m_from_height, self.h_time);
            }
            self.steps_wrap.style.height = self.m_height + 'px';
            self.tick = 0;
          }
        
          if (self.m_time > self.h_time) {
            self.m_g = self.m_to_g;
            self.m_c = self.m_to_c;
            self.anim_h = false;
            self.anim_v = (self.m_to_height != self.m_height);
            self.m_time -= self.h_time;
          } else {
            self.m_g = self.anim(self.m_time, self.m_from_g, self.m_to_g - self.m_from_g, self.h_time);
            self.m_c = self.anim(self.m_time, self.m_from_c, self.m_to_c - self.m_from_c, self.h_time);
            if (self.diff) self.steps_glass.style.width = self.anim(self.m_time, self.from, self.diff, self.h_time)+'px';
          }
          self.steps_content.style.marginLeft = self.m_c + 'px';

          self.steps_glass.style.marginLeft = self.m_g + 'px';
          self.steps_glass_c.style.marginLeft = (-self.m_g - 2) + 'px';

          self.m_cur = Math.floor(self.m_g / 140) + 1;

        }
        if (!self.anim_h) {
          self.step = self.m_to;
          //hab.setHash('devstep' + this.step);
          location.hash = 'devstep' + self.step;
          self.steps_wrap.style.height = self.m_to_height + 'px';
          clearInterval(self.moving);
          self.moving = false;
          if (self.step == 3 && ge('inv_password')) focus('inv_password');
        }
      }, 13);
    }
    
    this.m_to = to_step;

    this.m_next = this.m_cur;

    if (this.m_to == 3) {
      this.from = this.g_from_c;
      this.diff = this.g_to_c - this.g_from_c;
    } else if(this.m_cur == 3) {
      this.from = this.g_to_c;
      this.diff = this.g_from_c - this.g_to_c;
    } else if (!moving) {
      this.diff = false;
    } else {
      this.from = this.anim(this.m_time, this.from, this.diff, this.h_time);
      this.diff = this.g_from_c - this.from;
    }
    
    this.m_time = 0;

    this.m_from_height = this.m_height;

    var to_node = ge('dev_step' + this.m_to + '_c');
    to_node.style.position = 'absolute';
    to_node.style.left = '-5000px';
    show(to_node);
    this.m_to_height = geByClass('borders', to_node)[0].offsetHeight;

    this.m_from_g = this.m_g;
    this.m_to_g = (this.m_to - 1) * 140;
    this.m_from_c = this.m_c;
    this.g_from_c = 141;
    this.g_to_c = 236;
    this.m_to_c = (1 - this.m_to) * 540;
    this.anim_v = (this.m_to_height > this.m_height);
    this.steps_wrap.style.height = this.m_height + 'px';
    //this.steps_wrap.style.overflow = 'hidden';

    to_node.style.position = 'static';
    to_node.style.left = 'auto';
    this.anim_h = true;
    if (this.anim_h = true) {
      for (var i = 1; i <= 3; ++i) {
        show('dev_step' + i + '_c');
        if (browser.opera_mini) {
          //ge('dev_step' + i +'_c').style.visibility = 'visible';
        } else {
          ge('dev_step' + i +'_c').style.height = 'auto';
        }
      }
    }
    this.h_time = Math.abs(this.m_to_c - this.m_c) * 2 / 5; // horizontal
    this.v_time = Math.abs(this.m_to_height - this.m_height) / 2; // vertical
    if (this.h_time > 500) this.h_time = 500;
    if (this.v_time > 500) this.v_time = 500;
  }


  this.g_from_c = 141;
  this.g_to_c = 236;
  //this.steps_wrap.style.overflow = 'visible';  
  this.m_height = this.steps_wrap.offsetHeight - 2;
  
  
  var to_node = ge('dev_step' + this.step + '_c');
  this.m_to_height = geByClass('borders', to_node)[0].offsetHeight;
  this.steps_wrap.style.height = this.m_to_height + 'px';
  
  this.m_g = (this.step - 1) * 140;
  this.m_c = (1 - this.step) * 540;
  this.steps_glass.style.marginLeft = this.m_g + 'px';
  this.steps_glass_c.style.marginLeft = (-this.m_g - 2) + 'px';
  show(this.steps_glass);
  this.steps_content.style.marginLeft = this.m_c + 'px';
  if (this.step == 3) this.steps_glass.style.width = this.g_to_c + 'px';
  show(this.steps_content);

  this.nav = {
    'devstep(\\d)': function(m) {
       var step = intval(m[1]);
       if (step < 1 || step > 3) {
         setTimeout(function() {location.replace('/#devstep1');}, 0);
       } else {
         this.move(step);
         document.title = document.title;
       }
    }
  }



  var slide_show = function(elem, speed) {
    if (!isVisible(elem)) slideDown(elem, speed || 150);
  }
  var slide_hide = function(elem, speed) {
    if (isVisible(elem)) slideUp(elem, speed || 150); 
  }
}

function dev_step(to_step) {
  if (nav) {
    nav.move(to_step);
  }
  return false;
}

window.prevSection = false;

function slideSection(obj, directly) {
  if (!directly) obj = obj.parentNode.children[1];
  if (prevSection) {
    slideToggle(window.prevSection, 300, function() {
      //alert();
    });
  }
  window.prevSection = obj;
  slideToggle(obj, 200, function() {
    //alert();
  });
}
