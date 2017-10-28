goog.require('Blockly.Blocks');



//Blockly.Blocks.colour.HUE = 20;

/*

Blockly.Blocks['name'] = {
  
  init: function() {
    this.jsonInit({
      
    });
  }
};


*/

/*
  NI: Not implemented
  NFI: Not fully implemented
  NT: Not tested
*/

var TOAST_ERROR_PROGRAM = 0;
var TOAST_ERROR_BLOCKS = 1;
var TOAST_SUCCESS = 2;
var TOAST_WARNING = 3;
var TOAST_UPDATE = 4;
function sendToast(type, message){
  switch(type){
    case TOAST_ERROR_PROGRAM: toastr.error(message, "ScratchForge Error"); break;
    case TOAST_ERROR_BLOCKS: toastr.error(message, "Code Error"); break;
    case TOAST_SUCCESS: toastr.success(message, "Success"); break;
    case TOAST_WARNING: toastr.warning(message, "Warning"); break;
    case TOAST_UPDATE: toastr.info(message, "Success"); break;
  }
}

function showError(block, msg){
  var nice = msg.replace("FS ", "");
  block.setWarningText(nice);
  sendToast(TOAST_ERROR_BLOCKS, nice);
  throw("FS " + msg); //code.js will catch
};

function showWarning(block, msg){
  var nice = msg.replace("FS ", "");
  block.setWarningText(nice);
  sendToast(TOAST_WARNING, nice);
}


var RETURNS = '/*returns*/';

var COLOR_CONSTRUCTOR = 15;
var COLOR_CONSTRUCTOR_OPTION = 40;
var COLOR_ACTIONS = 140;
var COLOR_VARIABLES = 290;
var COLOR_EVENTS = 180;
var COLOR_RECIPES = 200;


Blockly.Blocks['mcblock'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblock",
  "message0": "Minecraft Block %1 Name: %2 %3 Properties: %4 %5 Unbreakable %6 %7 Explosion Resistant %8 %9 Options %10 %11",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "Block Name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "MATERIAL",
      "options": [
        [
          "Dirt",
          "Material.ground"
        ],
        [
          "Stone",
          "Material.rock"
        ],
        [
          "Wood",
          "Material.wood"
        ],
        [
          "Glass",
          "Material.glass"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "UNBREAKABLE",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "EXPLOSION",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "Options",
      "check": "mcblockoptions"
    }
  ],
  "inputsInline": false,
  "colour": COLOR_CONSTRUCTOR,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

function isJavaId(c)
{
  return c.match(/[a-zA-Z0-9]/i);
}

function make_java_id(name)
{
  var result = "";
  for (var i = 0; i < name.length; ++i) {
    var c = name.charAt(i);
    if (isJavaId(c)) {
      result = result + c;
    }
    else {
      result = result + "_";
    }
  }

  return result;
}


Blockly.Java['mcblock'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('NAME'));
  var raw_value_name = block.getFieldValue('NAME');
  var dropdown_material = block.getFieldValue('MATERIAL');
  var checkbox_unbreakable = block.getFieldValue('UNBREAKABLE') == 'TRUE';
  var checkbox_explosion = block.getFieldValue('EXPLOSION') == 'TRUE';
  var statements_options = Blockly.Java.statementToCode(block, 'Options');
  var code = 
    '/*BEGIN:' + value_name + '*/\n' +
    '/*type:block*/\n' +
    '    public class Mcblock_' + value_name + ' extends BlockBase {\n' +
    '        public Mcblock_' + value_name + '() {\n' +
    '            super(BLOCK_ID, CREATIVE_TAB, "' + raw_value_name + '", ' + dropdown_material + '); \n' +
    '\n'+
    'if(' + checkbox_unbreakable + '){\n' +
    '    setHardness(-1.0F);\n' +
    '}\n' +
    
    'if(' + checkbox_explosion + '){\n' +
    '    setResistance(6000000.0F);\n' +
    '}\n' +

    '        }\n\n' +
          statements_options +
    '    }\n' +
    '/*END:' + value_name + '*/\n'

    ;

  return code;
};



Blockly.Blocks['mcblockflower'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockflower",
  "message0": "Minecraft Flower %1 Name: %2 %3 Unbreakable %4 %5 Explosion Resistant %6 %7 Options %8 %9",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "Block Flower Name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "UNBREAKABLE",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "EXPLOSION",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "Options",
      "check": "mcblockoptions"
    }
  ],
  "inputsInline": false,
  "colour": COLOR_CONSTRUCTOR,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};



Blockly.Java['mcblockflower'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('NAME'));
  var raw_value_name = block.getFieldValue('NAME');
  var checkbox_unbreakable = block.getFieldValue('UNBREAKABLE') == 'TRUE';
  var checkbox_explosion = block.getFieldValue('EXPLOSION') == 'TRUE';
  var statements_options = Blockly.Java.statementToCode(block, 'Options');

  var code = 
    '/*BEGIN:' + value_name + '*/\n' +
    '/*type:blockFlower*/\n' +
    '    public class McblockFlower_' + value_name + ' extends BlockBaseFlower {\n' +
    '        public McblockFlower_' + value_name + '() {\n' +
    '            super(BLOCK_ID, CREATIVE_TAB, "' + raw_value_name + '"); \n' +
    '\n'+
    'if(' + checkbox_unbreakable + '){\n' +
    '    setHardness(-1.0F);\n' +
    '}\n' +
    
    'if(' + checkbox_explosion + '){\n' +
    '    setResistance(6000000.0F);\n' +
    '}\n' +

    '        }\n\n' +
          statements_options +
    '    }\n' +
    '/*END:' + value_name + '*/\n';
  return code;
};




Blockly.Blocks['mcblockplant'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockplant",
  "message0": "Minecraft Plant %1 Name: %2 %3 Plant Type %4 %5 Unbreakable %6 %7 Explosion Resistant %8 %9 World Generation %10 %11 Needs water to generate %12 %13 Plant Max Grow Height: %14 %15 Options %16 %17",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "Block Plant Name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": [
        [
          "Plains",
          "EnumPlantType.Plains"
        ],
        [
          "Desert",
          "EnumPlantType.Desert"
        ],
        [
          "Beach",
          "EnumPlantType.Beach"
        ],
        [
          "Cave",
          "EnumPlantType.Cave"
        ],
        [
          "Water",
          "EnumPlantType.Water"
        ],
        [
          "Crop",
          "EnumPlantType.Crop"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "UNBREAKABLE",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "EXPLOSION",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "GEN",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "WATERGEN",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "HEIGHT",
      "text": "3"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "Options",
      "check": "mcblockoptions"
    }
  ],
  "inputsInline": false,
  "colour": COLOR_CONSTRUCTOR,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockplant'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('NAME'));
  var raw_value_name = block.getFieldValue('NAME');
  var dropdown_type = block.getFieldValue('TYPE');
  var checkbox_unbreakable = block.getFieldValue('UNBREAKABLE') == 'TRUE';
  var checkbox_explosion = block.getFieldValue('EXPLOSION') == 'TRUE';
  var checkbox_gen = block.getFieldValue('GEN') == 'TRUE';
  var checkbox_watergen = block.getFieldValue('WATERGEN') == 'TRUE';
  var value_height = block.getFieldValue('HEIGHT');
  var statements_options = Blockly.Java.statementToCode(block, 'Options');

  if(isNaN(parseInt(value_height))){
    showError(block, "Max Plant Grow Height must be a number!");
  }

  var code = 
    '/*BEGIN:' + value_name + '*/\n' +
    '/*type:blockPlant*/\n' +
    '    public class McblockPlant_' + value_name + ' extends BlockBasePlant {\n' +
    '        public McblockPlant_' + value_name + '() {\n' +
    '            super(BLOCK_ID, CREATIVE_TAB, "' + raw_value_name + '", ' + dropdown_type + ', ' + checkbox_gen + ', ' + checkbox_watergen + ', ' + value_height + '); \n' +
    '\n'+
    'if(' + checkbox_unbreakable + '){\n' +
    '    setHardness(-1.0F);\n' +
    '}\n' +
    
    'if(' + checkbox_explosion + '){\n' +
    '    setResistance(6000000.0F);\n' +
    '}\n' +

    '        }\n\n' +
          statements_options +
    '    }\n'+
    '/*END:' + value_name + '*/\n';
  return code;
};



Blockly.Blocks['mcblockoptions_quantity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Amount Dropped: %1",
  "args0": [
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_quantity'] = function(block) {
  var value_amount = Blockly.Java.valueToCode(block, 'AMOUNT', Blockly.Java.ORDER_ATOMIC);
  var code = 
  '    @Override\n' + 
  '    public int quantityDropped(Random r){\n' +
  '        return Math.max(0,(int)' + value_amount + ');\n' + 
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_lightopacity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Light Opacity %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LIGHT_OPACITY",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_lightopacity'] = function(block) {
  var value_light_opacity = Blockly.Java.valueToCode(block, 'LIGHT_OPACITY', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getLightOpacity() {\n' +
  '        return Math.min(15, Math.max(0,(int)' + value_light_opacity + '));\n' +
  '    }\n';

  return code;
};



Blockly.Blocks['mcblockoptions_lightvalue'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Light Value %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LIGHT_VALUE",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_lightvalue'] = function(block) {
  var value_light_value  = Blockly.Java.valueToCode(block, 'LIGHT_VALUE', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getLightValue() {\n' +
  '        return Math.min(15, Math.max(0,(int)' + value_light_value  + '));\n' +
  '    }\n';

  return code;
};


Blockly.Blocks['mcblockoptions_click_right'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_click_right",
  "message0": "On Right Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_click_right'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  statements_code = statements_code.replace(RETURNS, 'true');

  var code = 
  '    @Override\n' +
  '    public boolean onBlockActivated(World world, int x, int y, int z, EntityPlayer player, int side, float hx, float hy, float hz) {\n' +
  '         if(world.isRemote){return true;}\n' +
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '        ' + statements_code + '\n' +
  '        return true;\n' +
  '    }\n';
  return code;
};


Blockly.Blocks['mcblockoptions_click_left'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_click_left",
  "message0": "On Left Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_click_left'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  statements_code = statements_code.replace(RETURNS, '');
  var code = 
  '    @Override\n' +
  '    public void onBlockClicked(World world, int x, int y, int z, EntityPlayer player) {\n' +
  '         if(world.isRemote){return;}\n' +
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};


Blockly.Blocks['mcblockoptions_blockplaced'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_blockplaced",
  "message0": "On Block Placed %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_blockplaced'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  statements_code = statements_code.replace(RETURNS, '');

  var code = 
  '    @Override\n' +
  '    public void onBlockPlacedBy(World world, int x, int y, int z, EntityLivingBase player, ItemStack itemstack) {\n' +
  '         if(world.isRemote){return;}\n' +
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_block_broken_player'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_block_broken_player",
  "message0": "On Block Mined %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_block_broken_player'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  statements_code = statements_code.replace(RETURNS, '');

  var code = 
  '    @Override\n' +
  '    public void onBlockHarvested(World world, int x, int y, int z, int meta, EntityPlayer player) {\n' +
  '         if(world.isRemote){return;}\n' +
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_block_broken_explosion'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_block_broken_explosion",
  "message0": "On Block Destroyed By Explosion %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_block_broken_explosion'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  statements_code = statements_code.replace(RETURNS, '');

  var code = 
  '    @Override\n' +
  '    public void onBlockDestroyedByExplosion(World world, int x, int y, int z, Explosion explosion) {\n' +
  '         if(world.isRemote){return;}\n' +
  '         EntityPlayer player = null;\n' +
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_walkthrough'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "On Block Walkthrough %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_walkthrough'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  statements_code = statements_code.replace(RETURNS, '');

  var code = 
  '    @Override\n' +
  '    public void onEntityCollidedWithBlock(World world, int x, int y, int z, Entity genericEntity) {\n' +
  '         if(world.isRemote){return;}\n' +
  '        EntityPlayer player = null;\n' +
  '        final VariableHolder variableHolder = new VariableHolder();\n' +
  '        if(genericEntity instanceof EntityPlayer){\n' +
  '            player = (EntityPlayer)genericEntity;\n' + 
  '        }\n' +
    '      else if(genericEntity instanceof EntityLiving){\n' +
  '            variableHolder.entity = (EntityLiving)genericEntity;\n' + 
  '        }\n' +
  '            ' + statements_code + '\n' +
  '    }\n' +
  '\n' +
  '    @Override\n' +
  '    public AxisAlignedBB getCollisionBoundingBoxFromPool(World p_getCollisionBoundingBoxFromPool_1_, int p_getCollisionBoundingBoxFromPool_2_, int p_getCollisionBoundingBoxFromPool_3_, int p_getCollisionBoundingBoxFromPool_4_){return null;}\n' +
  '\n' +
  '    @Override\n' +
  '    public boolean renderAsNormalBlock(){return false;}\n'

  ;
  return code;
}; 


Blockly.Blocks['mcblockoptions_transparent'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Render Block Like Glass",
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_transparent'] = function(block) {
  var code = 
  '    @Override\n' +
  '    public boolean isOpaqueCube(){return false;}\n';
  return code;
};



Blockly.Blocks['mcblockoptions_experience'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Amount Of XP To Drop %1",
  "args0": [
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_experience'] = function(block) {
  var value_aount  = Blockly.Java.valueToCode(block, 'AMOUNT', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getExpDrop() {\n' +
  '        return Math.max(0,(int)' + value_amount  + ');\n' +
  '    }\n';

  return code;
};


Blockly.Blocks['mcaction_time_selector'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_time_selector",
  "message0": "Set time to %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "time",
      "options": [
        [
          "Sunrise",
          "0"
        ],
        [
          "Day",
          "1000"
        ],
        [
          "Afternoon",
          "6000"
        ],
        [
          "Sunset",
          "12000"
        ],
        [
          "Night",
          "13000"
        ],
        [
          "Midnight",
          "18000"
        ]
      ]
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_time_selector'] = function(block) {
  var dropdown_time = block.getFieldValue('time');
  
  var code = 'world.setWorldTime(Math.max(0, (long)' + dropdown_time + '));';

  return code;
};


Blockly.Blocks['mcaction_time_raw'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_time_raw",
  "message0": "Set time to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_time_raw'] = function(block) {
  var value_time = Blockly.Java.valueToCode(block, 'time', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'world.setWorldTime(Math.max(0, (long)' + value_time + '));\n';

  return code;
};


Blockly.Blocks['mcaction_spawn_mob'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_spawn_mob",
  "message0": "Spawn Creature %1 Creature:  %2 %3 Location X: %4 Location Y: %5 Location Z: %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "MOB",
      "options": [
        [
          "Creeper",
          "Creeper"
        ],
        [
          "Skeleton",
          "Skeleton"
        ],
        [
          "Spider",
          "Spider"
        ],
        [
          "Giant",
          "Giant"
        ],
        [
          "Zombie",
          "Zombie"
        ],
        [
          "Slime",
          "Slime"
        ],
        [
          "Ghast",
          "Ghast"
        ],
        [
          "Zombie Pigman",
          "PigZombie"
        ],
        [
          "Enderman",
          "Enderman"
        ],
        [
          "Cave Spider",
          "CaveSpider"
        ],
        [
          "Silverfish",
          "Silverfish"
        ],
        [
          "Blaze",
          "Blaze"
        ],
        [
          " Lava Slime",
          "LavaSlime"
        ],
        [
          "Ender Dragon",
          "EnderDragon"
        ],
        [
          " Wither",
          "WitherBoss"
        ],
        [
          "Bat",
          "Bat"
        ],
        [
          "Pig",
          "Pig"
        ],
        [
          "Sheep",
          "Sheep"
        ],
        [
          "Cow",
          "Cow"
        ],
        [
          "Chicken",
          "Chicken"
        ],
        [
          "Squid",
          "SquidNew"
        ],
        [
          "Wolf",
          "Wolf"
        ],
        [
          "Mooshroom",
          "Mooshroom"
        ],
        [
          " Snow Man",
          "SnowMan"
        ],
        [
          "Cat",
          "Ozelot"
        ],
        [
          "Iron Golem",
          "VillagerGolem"
        ],
        [
          "Horse",
          "EntityHorse"
        ],
        [
          "Villager",
          "Villager"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_spawn_mob'] = function(block) {
  var dropdown_mob = block.getFieldValue('MOB');
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);

  var code = 'variableHolder.entity = ModHelpers.spawnEntityInWorld(world, ' + value_loc_x + ', ' + value_loc_y + ', ' + value_loc_z + ', "' + dropdown_mob + '");\n';
  return code;
};

Blockly.Blocks['mcaction_explosion'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_explosion",
  "message0": "Explosion %1 Power %2 Location X %3 Location Y %4 Location Z %5 Smoke %6 %7 Fire %8",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "POWER",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    },
    {
      "type": "field_checkbox",
      "name": "SMOKE",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "FIRE",
      "checked": false
    }
  ],
  "inputsInline": false,
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcaction_explosion'] = function(block) {
  var value_power = Blockly.Java.valueToCode(block, 'POWER', Blockly.Java.ORDER_ATOMIC);
  var checkbox_smoke = block.getFieldValue('SMOKE') == 'TRUE';
  var checkbox_fire = block.getFieldValue('FIRE') == 'TRUE';
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);

  var code = 'world.newExplosion((Entity)null, ' + value_loc_x + ', ' + value_loc_y + ' + 1, ' + value_loc_z + ', ' + value_power + ', ' + checkbox_fire + ', ' + checkbox_smoke + ');\n';
  return code;
};

Blockly.Blocks['mcaction_potionplayer'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_potionplayer",
  "message0": "Add Potion Effect To Player %1 Potion:  %2 %3 Seconds %4 Amplifier %5 Make Particles Invisible %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "POTION",
      "options": [
        [
          "Speed",
          "1"
        ],
        [
          "Slowness",
          "2"
        ],
        [
          "Haste",
          "3"
        ],
        [
          "Mining Fatigue",
          "4"
        ],
        [
          "Strength",
          "5"
        ],
        [
          "Instant Health",
          "6"
        ],
        [
          "Instant Damage",
          "7"
        ],
        [
          "Jump Boost",
          "8"
        ],
        [
          "Nausea",
          "9"
        ],
        [
          "Regeneration",
          "10"
        ],
        [
          "Resistance",
          "11"
        ],
        [
          "Fire Resistance",
          "12"
        ],
        [
          "Water Breathing",
          "13"
        ],
        [
          "Invisibility",
          "14"
        ],
        [
          "Blindness",
          "15"
        ],
        [
          "Night Vision",
          "16"
        ],
        [
          "Hunger",
          "17"
        ],
        [
          "Weakness",
          "18"
        ],
        [
          "Poison",
          "19"
        ],
        [
          "Wither",
          "20"
        ],
        [
          "Health Boost",
          "21"
        ],
        [
          "Absorption",
          "22"
        ],
        [
          "Saturation",
          "23"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "TIME",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "AMP",
      "check": "Number"
    },
    {
      "type": "field_checkbox",
      "name": "INVIS",
      "checked": true
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_potionplayer'] = function(block) {
  var dropdown_potion = block.getFieldValue('POTION');
  var value_time = Blockly.Java.valueToCode(block, 'TIME', Blockly.Java.ORDER_ATOMIC);
  var value_amp = Blockly.Java.valueToCode(block, 'AMP', Blockly.Java.ORDER_ATOMIC);
  var checkbox_invis = block.getFieldValue('INVIS') == 'TRUE';

  var code = 'if(player != null){ModHelpers.addPotionToEntity(player, ' + dropdown_potion + ', ' + value_time +', ' + value_amp +', ' + checkbox_invis +');}\n';
  return code;
};

Blockly.Blocks['mcaction_potionentity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_potionentity",
  "message0": "Add Potion Effect To A Creature %1 Potion:  %2 %3 Seconds %4 Amplifier %5 Make Particles Invisible %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "POTION",
      "options": [
        [
          "Speed",
          "1"
        ],
        [
          "Slowness",
          "2"
        ],
        [
          "Haste",
          "3"
        ],
        [
          "Mining Fatigue",
          "4"
        ],
        [
          "Strength",
          "5"
        ],
        [
          "Instant Health",
          "6"
        ],
        [
          "Instant Damage",
          "7"
        ],
        [
          "Jump Boost",
          "8"
        ],
        [
          "Nausea",
          "9"
        ],
        [
          "Regeneration",
          "10"
        ],
        [
          "Resistance",
          "11"
        ],
        [
          "Fire Resistance",
          "12"
        ],
        [
          "Water Breathing",
          "13"
        ],
        [
          "Invisibility",
          "14"
        ],
        [
          "Blindness",
          "15"
        ],
        [
          "Night Vision",
          "16"
        ],
        [
          "Hunger",
          "17"
        ],
        [
          "Weakness",
          "18"
        ],
        [
          "Poison",
          "19"
        ],
        [
          "Wither",
          "20"
        ],
        [
          "Health Boost",
          "21"
        ],
        [
          "Absorption",
          "22"
        ],
        [
          "Saturation",
          "23"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "TIME",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "AMP",
      "check": "Number"
    },
    {
      "type": "field_checkbox",
      "name": "INVIS",
      "checked": true
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_potionentity'] = function(block) {
  var dropdown_potion = block.getFieldValue('POTION');
  var value_time = Blockly.Java.valueToCode(block, 'TIME', Blockly.Java.ORDER_ATOMIC);
  var value_amp = Blockly.Java.valueToCode(block, 'AMP', Blockly.Java.ORDER_ATOMIC);
  var checkbox_invis = block.getFieldValue('INVIS') == 'TRUE';

  var code = 'if(variableHolder.entity != null) {ModHelpers.addPotionToEntity(variableHolder.entity, ' + dropdown_potion + ', ' + value_time +', ' + value_amp +', ' + checkbox_invis +');}\n';
  return code;
};


Blockly.Blocks['mcaction_playsound'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_playsound",
  "message0": "Play Sound:  %1",
  "args0": [
    {
      "type": "input_value",
      "name": "SOUND",
      "check": "String"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_playsound'] = function(block) {
  var value_sound = Blockly.Java.valueToCode(block, 'SOUND', Blockly.Java.ORDER_ATOMIC)

  value_sound = value_sound.replace('(', '');
  value_sound = value_sound.replace(')', '');

  var code = 'if(player != null){world.playSoundAtEntity(player, ' + value_sound + ', 1, 1);}\n';
  return code;
};



Blockly.Blocks['mciteminput'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mciteminput",
  "message0": "Item %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ITEM",
      "options": [
            ["Apple", "apple"],
            ["Arrow", "arrow"],
            ["Baked Potato", "baked_potato"],
            ["Bed", "bed"],
            ["Beef", "beef"],
            ["Blaze Powder", "blaze_powder"],
            ["Blaze Rod", "blaze_rod"],
            ["Boat", "boat"],
            ["Bone", "bone"],
            ["Book", "book"],
            ["Bow", "bow"],
            ["Bowl", "bowl"],
            ["Bread", "bread"],
            ["Brewing Stand", "brewing_stand"],
            ["Brick", "brick"],
            ["Bucket", "bucket"],
            ["Cake", "cake"],
            ["Carrot", "carrot"],
            ["Carrot On A Stick", "carrot_on_a_stick"],
            ["Cauldron", "cauldron"],
            ["Chainmail Boots", "chainmail_boots"],
            ["Chainmail Chestplate", "chainmail_chestplate"],
            ["Chainmail Helmet", "chainmail_helmet"],
            ["Chainmail Leggings", "chainmail_leggings"],
            ["Chest Minecart", "chest_minecart"],
            ["Chicken", "chicken"],
            ["Clay Ball", "clay_ball"],
            ["Clock", "clock"],
            ["Coal", "coal"],
            ["Command Block Minecart", "command_block_minecart"],
            ["Comparator", "comparator"],
            ["Compass", "compass"],
            ["Cooked Beef", "cooked_beef"],
            ["Cooked Chicken", "cooked_chicken"],
            ["Cooked Fished", "cooked_fished"],
            ["Cooked Porkchop", "cooked_porkchop"],
            ["Cookie", "cookie"],
            ["Diamond", "diamond"],
            ["Diamond Axe", "diamond_axe"],
            ["Diamond Boots", "diamond_boots"],
            ["Diamond Chestplate", "diamond_chestplate"],
            ["Diamond Helmet", "diamond_helmet"],
            ["Diamond Hoe", "diamond_hoe"],
            ["Diamond Horse Armor", "diamond_horse_armor"],
            ["Diamond Leggings", "diamond_leggings"],
            ["Diamond Pickaxe", "diamond_pickaxe"],
            ["Diamond Shovel", "diamond_shovel"],
            ["Diamond Sword", "diamond_sword"],
            ["Dye", "dye"],
            ["Egg", "egg"],
            ["Emerald", "emerald"],
            ["Enchanted Book", "enchanted_book"],
            ["Ender Eye", "ender_eye"],
            ["Ender Pearl", "ender_pearl"],
            ["Experience Bottle", "experience_bottle"],
            ["Feather", "feather"],
            ["Fermented Spider Eye", "fermented_spider_eye"],
            ["Fire Charge", "fire_charge"],
            ["Firework Charge", "firework_charge"],
            ["Fireworks", "fireworks"],
            ["Fish", "fish"],
            ["Fishing Rod", "fishing_rod"],
            ["Flint", "flint"],
            ["Flint And Steel", "flint_and_steel"],
            ["Flower Pot", "flower_pot"],
            ["Furnace Minecart", "furnace_minecart"],
            ["Ghast Tear", "ghast_tear"],
            ["Glass Bottle", "glass_bottle"],
            ["Glowstone Dust", "glowstone_dust"],
            ["Gold Ingot", "gold_ingot"],
            ["Gold Nugget", "gold_nugget"],
            ["Golden Apple", "golden_apple"],
            ["Golden Axe", "golden_axe"],
            ["Golden Boots", "golden_boots"],
            ["Golden Carrot", "golden_carrot"],
            ["Golden Chestplate", "golden_chestplate"],
            ["Golden Helmet", "golden_helmet"],
            ["Golden Hoe", "golden_hoe"],
            ["Golden Horse Armor", "golden_horse_armor"],
            ["Golden Leggings", "golden_leggings"],
            ["Golden Pickaxe", "golden_pickaxe"],
            ["Golden Shovel", "golden_shovel"],
            ["Golden Sword", "golden_sword"],
            ["Gunpowder", "gunpowder"],
            ["Hopper Minecart", "hopper_minecart"],
            ["Iron Axe", "iron_axe"],
            ["Iron Boots", "iron_boots"],
            ["Iron Chestplate", "iron_chestplate"],
            ["Iron Door", "iron_door"],
            ["Iron Helmet", "iron_helmet"],
            ["Iron Hoe", "iron_hoe"],
            ["Iron Horse Armor", "iron_horse_armor"],
            ["Iron Ingot", "iron_ingot"],
            ["Iron Leggings", "iron_leggings"],
            ["Iron Pickaxe", "iron_pickaxe"],
            ["Iron Shovel", "iron_shovel"],
            ["Iron Sword", "iron_sword"],
            ["Item Frame", "item_frame"],
            ["ItemMapfilled Map", "ItemMapfilled_map"],
            ["ItemShearsshears", "ItemShearsshears"],
            ["Lava Bucket", "lava_bucket"],
            ["Lead", "lead"],
            ["Leather", "leather"],
            ["Leather Boots", "leather_boots"],
            ["Leather Chestplate", "leather_chestplate"],
            ["Leather Helmet", "leather_helmet"],
            ["Leather Leggings", "leather_leggings"],
            ["Magma Cream", "magma_cream"],
            ["Map", "map"],
            ["Melon", "melon"],
            ["Melon Seeds", "melon_seeds"],
            ["Milk Bucket", "milk_bucket"],
            ["Minecart", "minecart"],
            ["Mushroom Stew", "mushroom_stew"],
            ["Name Tag", "name_tag"],
            ["Nether Star", "nether_star"],
            ["Nether Wart", "nether_wart"],
            ["Netherbrick", "netherbrick"],
            ["Painting", "painting"],
            ["Paper", "paper"],
            ["Poisonous Potato", "poisonous_potato"],
            ["Porkchop", "porkchop"],
            ["Potato", "potato"],
            ["Potionitem", "potionitem"],
            ["Pumpkin Pie", "pumpkin_pie"],
            ["Pumpkin Seeds", "pumpkin_seeds"],
            ["Quartz", "quartz"],
            ["Record 11", "record_11"],
            ["Record 13", "record_13"],
            ["Record Blocks", "record_blocks"],
            ["Record Cat", "record_cat"],
            ["Record Chirp", "record_chirp"],
            ["Record Far", "record_far"],
            ["Record Mall", "record_mall"],
            ["Record Mellohi", "record_mellohi"],
            ["Record Stal", "record_stal"],
            ["Record Strad", "record_strad"],
            ["Record Wait", "record_wait"],
            ["Record Ward", "record_ward"],
            ["Redstone", "redstone"],
            ["Reeds", "reeds"],
            ["Repeater", "repeater"],
            ["Rotten Flesh", "rotten_flesh"],
            ["Saddle", "saddle"],
            ["Sign", "sign"],
            ["Skull", "skull"],
            ["Slime Ball", "slime_ball"],
            ["Snowball", "snowball"],
            ["Spawn Egg", "spawn_egg"],
            ["Speckled Melon", "speckled_melon"],
            ["Spider Eye", "spider_eye"],
            ["Stick", "stick"],
            ["Stone Axe", "stone_axe"],
            ["Stone Hoe", "stone_hoe"],
            ["Stone Pickaxe", "stone_pickaxe"],
            ["Stone Shovel", "stone_shovel"],
            ["Stone Sword", "stone_sword"],
            ["String", "string"],
            ["Sugar", "sugar"],
            ["Tnt Minecart", "tnt_minecart"],
            ["Water Bucket", "water_bucket"],
            ["Wheat", "wheat"],
            ["Wheat Seeds", "wheat_seeds"],
            ["Wooden Axe", "wooden_axe"],
            ["Wooden Door", "wooden_door"],
            ["Wooden Hoe", "wooden_hoe"],
            ["Wooden Pickaxe", "wooden_pickaxe"],
            ["Wooden Shovel", "wooden_shovel"],
            ["Wooden Sword", "wooden_sword"],
            ["Writable Book", "writable_book"],
            ["Written Book", "written_book"]
          
      ]
    }
  ],
  "output": "mciteminput",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mciteminput'] = function(block) {
  var dropdown_item = block.getFieldValue('ITEM');
  
  var code = 'Items.' + dropdown_item;
  return [code, Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['mcblockinput'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockinput",
  "message0": "Block %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BLOCK",
      "options": [
                ["Acacia Stairs", "acacia_stairs"],
                ["Activator Rail", "activator_rail"],
                ["Air", "air"],
                ["Anvil", "anvil"],
                ["Beacon", "beacon"],
                ["Bed", "bed"],
                ["Bedrock", "bedrock"],
                ["Birch Stairs", "birch_stairs"],
                ["Bookshelf", "bookshelf"],
                ["Brewing Stand", "brewing_stand"],
                ["Brick", "brick_"],
                ["Brick Stairs", "brick_stairs"],
                ["Brown Mushroom", "brown_mushroom"],
                /*["Brown Mushroom", "brown_mushroom_"],*/
                ["Cactus", "cactus"],
                ["Cake", "cake"],
                ["Carpet", "carpet"],
                ["Carrots", "carrots"],
                ["Cauldron", "cauldron"],
                ["Chest", "chest"],
                ["Clay", "clay"],
                ["Coal", "coal_block"],
                ["Coal Ore", "coal_ore"],
                ["Cobblestone", "cobblestone"],
                ["Cobblestone Wall", "cobblestone_wall"],
                ["Cocoa", "cocoa"],
                ["Command", "command"],
                ["Crafting Table", "crafting_table"],
                ["Dark Oak Stairs", "dark_oak_stairs"],
                ["Daylight Detector", "daylight_detector"],
                ["Deadbush", "deadbush"],
                ["Detector Rail", "detector_rail"],
                ["Diamond", "diamond_block"],
                ["Diamond Ore", "diamond_ore"],
                ["Dirt", "dirt"],
                ["Dispenser", "dispenser"],
                ["Double Plant", "double_plant"],
                ["Double Stone Slab", "double_stone_slab"],
                ["Double Wooden Slab", "double_wooden_slab"],
                ["Dragon Egg", "dragon_egg"],
                ["Dropper", "dropper"],
                ["Emerald", "emerald_block"],
                ["Emerald Ore", "emerald_ore"],
                ["Enchanting Table", "enchanting_table"],
                ["End Portal", "end_portal"],
                ["End Portal Frame", "end_portal_frame"],
                ["End Stone", "end_stone"],
                ["Ender Chest", "ender_chest"],
                ["Farmland", "farmland"],
                ["Fence", "fence"],
                ["Fence Gate", "fence_gate"],
                ["Fire", "fire"],
                ["Flower Pot", "flower_pot"],
                ["Flowing Lava", "flowing_lava"],
                ["Flowing Water", "flowing_water"],
                ["Furnace", "furnace"],
                ["Glass", "glass"],
                ["Glass Pane", "glass_pane"],
                ["Glowstone", "glowstone"],
                ["Gold", "gold_block"],
                ["Gold Ore", "gold_ore"],
                ["Golden Rail", "golden_rail"],
                ["Grass", "grass"],
                ["Gravel", "gravel"],
                ["Hardened Clay", "hardened_clay"],
                ["Hay", "hay"],
                ["Heavy Weighted Pressure Plate", "heavy_weighted_pressure_plate"],
                ["Hopper", "hopper"],
                ["Ice", "ice"],
                ["Iron", "iron_block"],
                ["Iron Bars", "iron_bars"],
                ["Iron Door", "iron_door"],
                ["Iron Ore", "iron_ore"],
                ["Jukebox", "jukebox"],
                ["Jungle Stairs", "jungle_stairs"],
                ["Ladder", "ladder"],
                ["Lapis", "lapis_block"],
                ["Lapis Ore", "lapis_ore"],
                ["Lava", "lava"],
                ["Leaves", "leaves"],
                ["Leaves2", "leaves2"],
                ["Lever", "lever"],
                ["Light Weighted Pressure Plate", "light_weighted_pressure_plate"],
                ["Lit Furnace", "lit_furnace"],
                ["Lit Pumpkin", "lit_pumpkin"],
                ["Lit Redstone Lamp", "lit_redstone_lamp"],
                ["Lit Redstone Ore", "lit_redstone_ore"],
                ["Log", "log"],
                ["Log2", "log2"],
                ["Melon", "melon"],
                ["Melon Stem", "melon_stem"],
                ["Mob Spawner", "mob_spawner"],
                ["Monster Egg", "monster_egg"],
                ["Mossy Cobblestone", "mossy_cobblestone"],
                ["Mycelium", "mycelium"],
                ["Nether Brick", "nether_brick"],
                ["Nether Brick Fence", "nether_brick_fence"],
                ["Nether Brick Stairs", "nether_brick_stairs"],
                ["Nether Wart", "nether_wart"],
                ["Netherrack", "netherrack"],
                ["Note", "note"],
                ["Oak Stairs", "oak_stairs"],
                ["Obsidian", "obsidian"],
                ["Packed Ice", "packed_ice"],
                ["Piston", "piston"],
                ["Piston Extension", "piston_extension"],
                ["Piston Head", "piston_head"],
                ["Planks", "planks"],
                ["Portal", "portal"],
                ["Potatoes", "potatoes"],
                ["Powered Comparator", "powered_comparator"],
                ["Powered Repeater", "powered_repeater"],
                ["Pumpkin", "pumpkin"],
                ["Pumpkin Stem", "pumpkin_stem"],
                ["Quartz", "quartz_block"],
                ["Quartz Ore", "quartz_ore"],
                ["Quartz Stairs", "quartz_stairs"],
                ["Rail", "rail"],
                ["Red Flower", "red_flower"],
                ["Red Mushroom", "red_mushroom"],
                ["Redstone", "redstone_block"],
                ["Redstone Lamp", "redstone_lamp"],
                ["Redstone Ore", "redstone_ore"],
                ["Redstone Torch", "redstone_torch"],
                ["Redstone Wire", "redstone_wire"],
                ["Reeds", "reeds"],
                ["Sand", "sand"],
                ["Sandstone", "sandstone"],
                ["Sandstone Stairs", "sandstone_stairs"],
                ["Sapling", "sapling"],
                ["Skull", "skull"],
                ["Snow", "snow"],
                ["Snow Layer", "snow_layer"],
                ["Soul Sand", "soul_sand"],
                ["Sponge", "sponge"],
                ["Spruce Stairs", "spruce_stairs"],
                ["Stained Glass", "stained_glass"],
                ["Stained Glass Pane", "stained_glass_pane"],
                ["Stained Hardened Clay", "stained_hardened_clay"],
                ["Standing Sign", "standing_sign"],
                ["Sticky Piston", "sticky_piston"],
                ["Stone", "stone"],
                ["Stone Brick Stairs", "stone_brick_stairs"],
                ["Stone Button", "stone_button"],
                ["Stone Pressure Plate", "stone_pressure_plate"],
                ["Stone Slab", "stone_slab"],
                ["Stone Stairs", "stone_stairs"],
                ["Stonebrick", "stonebrick"],
                ["Tallgrass", "tallgrass"],
                ["Tnt", "tnt"],
                ["Torch", "torch"],
                ["Trapdoor", "trapdoor"],
                ["Trapped Chest", "trapped_chest"],
                ["Tripwire", "tripwire"],
                ["Tripwire Hook", "tripwire_hook"],
                ["Unlit Redstone Torch", "unlit_redstone_torch"],
                ["Unpowered Comparator", "unpowered_comparator"],
                ["Unpowered Repeater", "unpowered_repeater"],
                ["Vine", "vine"],
                ["Wall Sign", "wall_sign"],
                ["Water", "water"],
                ["Waterlily", "waterlily"],
                ["Web", "web"],
                ["Wheat", "wheat"],
                ["Wooden Button", "wooden_button"],
                ["Wooden Door", "wooden_door"],
                ["Wooden Pressure Plate", "wooden_pressure_plate"],
                ["Wooden Slab", "wooden_slab"],
                ["Wool", "wool"],
                ["Yellow Flower", "yellow_flower"],   
      ]
    }
  ],
  "output": "mcblockinput",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcblockinput'] = function(block) {
  var dropdown_block = block.getFieldValue('BLOCK');
  
  var code = 'Blocks.' + dropdown_block;
  return [code, Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['mcaction_spawnitem'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_spawnitem",
  "message0": "Spawn Item %1 Item %2 Location X %3 Location Y %4 Location Z %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ITEM",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_spawnitem'] = function(block) {
  var value_item = Blockly.Java.valueToCode(block, 'ITEM', Blockly.Java.ORDER_ATOMIC);
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);



  var code = 
  '    world.spawnEntityInWorld(new EntityItem(world, '+ value_loc_x + ' + 0.5f, ' + value_loc_y + ' + 1, ' + value_loc_z + ' + 0.5f, new ItemStack' + value_item + '));\n';
  return code;
};



Blockly.Blocks['mcitem'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitem",
  "message0": "Minecraft Item %1 Name:  %2 %3 Max Stack Size: %4 %5 Options: %6 %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "Item Name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "AMOUNT",
      "text": "64"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "optionitem"
    }
  ],
  "inputsInline": false,
  "colour": COLOR_CONSTRUCTOR,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcitem'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('NAME'));
  var raw_value_name = block.getFieldValue('NAME');
  var value_amount = block.getFieldValue('AMOUNT');
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');

  if(isNaN(parseInt(value_amount))){
    showError(block, "Max Stack Size must be a number!");
  }



  var code = 
  '/*BEGIN:' + value_name + '*/\n' +
  '/*type:item*/\n' +
  '    public class Mcitem_' + value_name + ' extends ItemBase {\n' + 
  '        public Mcitem_' + value_name + '() {\n' +
  '            super(BLOCK_ID, CREATIVE_TAB, "' + raw_value_name + '", ' + value_amount + '); \n' +
  '        }\n\n' +
          statements_code +
    '    }\n'+
  '/*END:' + value_name + '*/\n';
  return code;
};





Blockly.Blocks['mcitemoptions_rightclick'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemoptions_rightclick",
  "message0": "On Right Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "optionitem",
  "nextStatement": "optionitem",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemoptions_rightclick'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  statements_code = statements_code.replace(RETURNS, 'itemstack');

  var code = 
  'public ItemStack onItemRightClick(ItemStack itemstack, World world, EntityPlayer player){\n' +
  '    if(world.isRemote){return itemstack;}\n' +
  '    final VariableHolder variableHolder = new VariableHolder();\n' +
  '    if (itemstack.hasTagCompound()){variableHolder.nbt = itemstack.getTagCompound();}else{variableHolder.nbt = new NBTTagCompound(); itemstack.setTagCompound(variableHolder.nbt);}\n' +
  '    ' + statements_code + '\n' +
  'itemstack.setTagCompound(variableHolder.nbt);\n' +
  '    return itemstack;\n' +
  '}'
  ;

  return code;
};



Blockly.Blocks['mcitemoptions_leftclick'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemoptions_leftclick",
  "message0": "On Left Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "optionitem",
  "nextStatement": "optionitem",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemoptions_leftclick'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  statements_code = statements_code.replace(RETURNS, 'true');

  var code = 
  'public boolean onItemUse(ItemStack itemstack, EntityPlayer player, World world, int x, int y, int z, int meta, float dx, float dy, float dz) {\n' +
  '    if(world.isRemote){return true;}\n' +
  '    final VariableHolder variableHolder = new VariableHolder();\n' +
  '    if (itemstack.hasTagCompound()){variableHolder.nbt = itemstack.getTagCompound();}else{variableHolder.nbt = new NBTTagCompound(); itemstack.setTagCompound(variableHolder.nbt);}\n' +
  '    ' + statements_code + '\n' +
  'itemstack.setTagCompound(variableHolder.nbt);\n' +
  '    return true;\n' +
  '}'
  ;

  return code;
};


Blockly.Blocks['mcitemoptions_lore'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemoptions_lore",
  "message0": "Lore %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LORE",
      "check": [
        "Array",
        "String"
      ]
    }
  ],
  "previousStatement": "optionitem",
  "nextStatement": "optionitem",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemoptions_lore'] = function(block) {
     var value_lore = Blockly.Java.valueToCode(block, 'LORE', Blockly.Java.ORDER_ATOMIC);
     var codeToAdd = "";
     if(value_lore.indexOf("Array") >= 0){
      codeToAdd = '    lores.addAll(' + value_lore + ');\n';
     }
     else{
      codeToAdd = '    lores.add(' + value_lore + ');\n';
     }
     var code = 
    '@Override\n' +
    'public void addInformation(ItemStack itemstack, EntityPlayer p_77624_2_, List lores, boolean p_77624_4_) {\n' +
    codeToAdd +
    '}\n'
    ;
    return code;
}

Blockly.Blocks['mcitemoptions_doesntleave'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemoptions_doesntleave",
  "message0": "Does Not Leave Crafting Grid",
  "previousStatement": "optionitem",
  "nextStatement": "optionitem",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "Make the item not leave the crafting grid when used to craft with",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemoptions_doesntleave'] = function(block) {
    var code = 
    '@Override\n' +
    'public boolean doesContainerItemLeaveCraftingGrid(ItemStack p_77630_1_){\n' +
    '    return false;\n' +
    '}\n'
    ;
    return code;
}


Blockly.Blocks['mcitemactions_nbt_hastag'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemactions_nbt_hastag",
  "message0": "NBT Has Tag: %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TAG",
      "check": "String"
    }
  ],
  "output": "Boolean",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemactions_nbt_hastag'] = function(block) {
  var value_tag = Blockly.Java.valueToCode(block, 'TAG', Blockly.Java.ORDER_ATOMIC);
  var code = 'variableHolder.nbt.hasKey(' + value_tag + ')';
  return [code, Blockly.Java.ORDER_NONE];
};

Blockly.Blocks['mcitemactions_nbt_setnumber'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemactions_nbt_setnumber",
  "message0": "NBT Set Number %1 Tag %2 Value %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "TAG",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemactions_nbt_setnumber'] = function(block) {
  var value_tag = Blockly.Java.valueToCode(block, 'TAG', Blockly.Java.ORDER_ATOMIC);
  var value_value = Blockly.Java.valueToCode(block, 'VALUE', Blockly.Java.ORDER_ATOMIC);
  var code = 'variableHolder.nbt.setDouble(' + value_tag + ', ' + value_value + ');\n';
  return code;
};

Blockly.Blocks['mcitemactions_nbt_setstring'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemactions_nbt_setstring",
  "message0": "NBT Set Text %1 Tag %2 Value %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "TAG",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemactions_nbt_setstring'] = function(block) {
  var value_tag = Blockly.Java.valueToCode(block, 'TAG', Blockly.Java.ORDER_ATOMIC);
  var value_value = Blockly.Java.valueToCode(block, 'VALUE', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'variableHolder.nbt.setString(' + value_tag + ', ' + value_value + ');\n';
  return code;
};

Blockly.Blocks['mcitemactions_nbt_getstring'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemactions_nbt_getstring",
  "message0": "NBT Get Text %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TAG",
      "check": "String"
    }
  ],
  "output": "String",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemactions_nbt_getstring'] = function(block) {
  var value_tag = Blockly.Java.valueToCode(block, 'TAG', Blockly.Java.ORDER_ATOMIC);
  var code = '(itemstack.getTagCompound() != null ? itemstack.getTagCompound().getString(' + value_tag + ') : "")';
  return [code, Blockly.Java.ORDER_NONE];
};

Blockly.Blocks['mcitemactions_nbt_getnumber'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemactions_nbt_getnumber",
  "message0": "NBT Get Number %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TAG",
      "check": "String"
    }
  ],
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcitemactions_nbt_getnumber'] = function(block) {
  var value_tag = Blockly.Java.valueToCode(block, 'TAG', Blockly.Java.ORDER_ATOMIC);
  //var code = 'itemstack.getTagCompound().getDouble(' + value_tag + ')';
   var code = '(itemstack.getTagCompound() != null ? itemstack.getTagCompound().getDouble(' + value_tag + ') : 0)';
  return [code, Blockly.Java.ORDER_NONE];
};

Blockly.Blocks['location_player_x'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_player_x",
  "message0": "Player X",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_player_x'] = function(block) {
  return ['player.posX', Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['location_player_y'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_player_y",
  "message0": "Player Y",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_player_y'] = function(block) {
  return ['player.posY', Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['location_player_z'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_player_z",
  "message0": "Player Z",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_player_z'] = function(block) {
  return ['player.posZ', Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['location_entity_x'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_entity_x",
  "message0": "Creature X",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_entity_x'] = function(block) {
  return ['variableHolder.entity.posX', Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['location_entity_y'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_entity_y",
  "message0": "Creature Y",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_entity_y'] = function(block) {
  return ['variableHolder.entity.posY', Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['location_entity_z'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_entity_z",
  "message0": "Creature Z",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_entity_z'] = function(block) {
  return ['variableHolder.entity.posZ', Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['location_block_x'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_block_x",
  "message0": "Block X",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_block_x'] = function(block) {
  return ['x', Blockly.Java.ORDER_NONE];
};





Blockly.Blocks['location_block_y'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_block_y",
  "message0": "Block Y",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_block_y'] = function(block) {
  return ['y', Blockly.Java.ORDER_NONE];
};




Blockly.Blocks['location_block_z'] = {
  
  init: function() {
    this.jsonInit({
      "type": "location_block_z",
  "message0": "Block Z",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['location_block_z'] = function(block) {
  return ['z', Blockly.Java.ORDER_NONE];
};

Blockly.Blocks['entity_get_health'] = {
  
  init: function() {
    this.jsonInit({
      "type": "entity_get_health",
  "message0": "Creature Health",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['entity_get_health'] = function(block) {
  return ['(variableHolder.entity != null ? variableHolder.entity.getHealth():0)', Blockly.Java.ORDER_NONE];
};

Blockly.Blocks['player_get_health'] = {
  
  init: function() {
    this.jsonInit({
      "type": "player_get_health",
  "message0": "Player Health",
  "output": "Number",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['player_get_health'] = function(block) {
  return ['(player != null ? player.getHealth():0)', Blockly.Java.ORDER_NONE];
};


Blockly.Blocks['mcaction_giveitem'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_giveitem",
  "message0": "Give Player Item %1",
  "args0": [
    {
      "type": "input_value",
      "name": "ITEM",
      "check": "mciteminput"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_giveitem'] = function(block) {
  var value_item = Blockly.Java.valueToCode(block, 'ITEM', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'if(player != null){player.inventory.addItemStackToInventory(new ItemStack' + value_item + ');}\n';
  return code;
};



Blockly.Blocks['mcaction_lightning'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_lightning",
  "message0": "Strike Lightning %1 Location X: %2 Location Y: %3 Location Z: %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_lightning'] = function(block) {
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);
 
  var code = 'world.addWeatherEffect((new EntityLightningBolt(world, ' + value_loc_x + ', ' + value_loc_y + ', ' + value_loc_z + ')));\n';
  return code;
};




Blockly.Blocks['mcaction_log'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_log",
  "message0": "Console Log %1 Message:  %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "MSG",
      "check": "String"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_log'] = function(block) {
  var value_msg = Blockly.Java.valueToCode(block, 'MSG', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    PLog.game(' + value_msg + ');\n';
  return code;
};


Blockly.Blocks['mcaction_chat'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_log",
  "message0": "Chat Message %1 Message:  %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "MSG",
      "check": "String"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_chat'] = function(block) {
  var value_msg = Blockly.Java.valueToCode(block, 'MSG', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  'if(player != null) {player.addChatMessage(new ChatComponentText(' + value_msg + '));}\n';
  return code;
};



Blockly.Blocks['mcaction_placeblock'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_placeblock",
  "message0": "Place Block %1 Block %2 Location X %3 Location Y %4 Location Z %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "BLOCK",
      "check": "mcblockinput"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcaction_placeblock'] = function(block) {
  var value_block = Blockly.Java.valueToCode(block, 'BLOCK', Blockly.Java.ORDER_ATOMIC);
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);

  var code = 'world.setBlock((int)' + value_loc_x + ', (int)' + value_loc_y + ', (int)' + value_loc_z + ', ' + value_block + ', 0, 3);\n';
  return code;
};






Blockly.Blocks['mcaction_placeblockmeta'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_placeblockmeta",
  "message0": "Place Block %1 Block %2 Block Meta %3 Location X %4 Location Y %5 Location Z %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "BLOCK",
      "check": "mcblockinput"
    },
    {
      "type": "input_value",
      "name": "META",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_placeblockmeta'] = function(block) {
  var value_block = Blockly.Java.valueToCode(block, 'BLOCK', Blockly.Java.ORDER_ATOMIC);
  var value_meta = Blockly.Java.valueToCode(block, 'META', Blockly.Java.ORDER_ATOMIC);
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);

  var code = 'world.setBlock((int)' + value_loc_x + ', (int)' + value_loc_y + ', (int)' + value_loc_z + ', ' + value_block + ', (int)' + value_meta +', 3);\n';
  return code;
};






Blockly.Blocks['mcaction_breakblock'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_breakblock",
  "message0": "Break Block %1 Drop Block %2 %3 Location X %4 Location Y %5 Location Z %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "DROP",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_breakblock'] = function(block) {
  var checkbox_drop = block.getFieldValue('DROP') == 'TRUE';
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'world.func_147480_a((int)' + value_loc_x + ', (int)' + value_loc_y + ', (int)' + value_loc_z +', ' + checkbox_drop + ');\n';
  return code;
};




Blockly.Blocks['mcaction_velocity_player'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_velocity_player",
  "message0": "Set Player Velocity %1 Velocity X %2 Velocity Y %3 Velocity Z %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "VEL_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "VEL_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "VEL_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcaction_velocity_player'] = function(block) {
  var value_vel_x = Blockly.Java.valueToCode(block, 'VEL_X', Blockly.Java.ORDER_ATOMIC);
  var value_vel_y = Blockly.Java.valueToCode(block, 'VEL_Y', Blockly.Java.ORDER_ATOMIC);
  var value_vel_z = Blockly.Java.valueToCode(block, 'VEL_Z', Blockly.Java.ORDER_ATOMIC);

  var code = 'if(player != null){player.setVelocity(' + value_vel_x + ', ' + value_vel_y + ', ' + value_vel_z +'); player.velocityChanged = true;}\n';
  return code;
};


Blockly.Blocks['mcaction_velocity_entity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_velocity_entity",
  "message0": "Set Creature Velocity %1 Velocity X %2 Velocity Y %3 Velocity Z %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "VEL_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "VEL_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "VEL_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_velocity_entity'] = function(block) {
  var value_vel_x = Blockly.Java.valueToCode(block, 'VEL_X', Blockly.Java.ORDER_ATOMIC);
  var value_vel_y = Blockly.Java.valueToCode(block, 'VEL_Y', Blockly.Java.ORDER_ATOMIC);
  var value_vel_z = Blockly.Java.valueToCode(block, 'VEL_Z', Blockly.Java.ORDER_ATOMIC);

  var code = 'if(variableHolder.entity != null){variableHolder.entity.setVelocity(' + value_vel_x + ', ' + value_vel_y + ', ' + value_vel_z +'); variableHolder.entity.velocityChanged = true;}\n';
  return code;
};



Blockly.Blocks['mcaction_teleport_player'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_teleport_player",
  "message0": "Teleport Player %1 Location X %2 Location Y %3 Location Z %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcaction_teleport_player'] = function(block) {
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'if(player != null){player.setPositionAndUpdate(' + value_loc_x + ', ' + value_loc_y + ', ' + value_loc_z +');}\n';
  return code;
};




Blockly.Blocks['mcaction_teleport_entity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_teleport_entity",
  "message0": "Teleport Creature %1 Location X %2 Location Y %3 Location Z %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcaction_teleport_entity'] = function(block) {
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'if(variableHolder.entity != null){(variableHolder.entity.setPositionAndUpdate(' + value_loc_x + ', ' + value_loc_y + ', ' + value_loc_z +');}\n';
  return code;
};




Blockly.Blocks['mcaction_firework'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_firework",
  "message0": "Launch Firework %1 Location X %2 Location Y %3 Location Z %4 Power %5 Flicker %6 %7 Trail %8 %9 Type %10 %11 Color %12",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "LOC_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "LOC_Z",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "POWER",
      "check": "Number"
    },
    {
      "type": "field_checkbox",
      "name": "FLICKER",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "TRAIL",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": [
        [
          "Small Ball",
          "0"
        ],
        [
          "Large Ball",
          "1"
        ],
        [
          "Star",
          "2"
        ],
        [
          "Creeper",
          "3"
        ],
        [
          "Burst",
          "4"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "COLOR",
      "check": [
        "String",
        "Array"
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_firework'] = function(block) {
  var value_loc_x = Blockly.Java.valueToCode(block, 'LOC_X', Blockly.Java.ORDER_ATOMIC);
  var value_loc_y = Blockly.Java.valueToCode(block, 'LOC_Y', Blockly.Java.ORDER_ATOMIC);
  var value_loc_z = Blockly.Java.valueToCode(block, 'LOC_Z', Blockly.Java.ORDER_ATOMIC);
  var value_power = Blockly.Java.valueToCode(block, 'POWER', Blockly.Java.ORDER_ATOMIC);
  var checkbox_flicker = block.getFieldValue('FLICKER') == 'TRUE';
  var checkbox_trail = block.getFieldValue('TRAIL') == 'TRUE';
  var dropdown_type = block.getFieldValue('TYPE');
  var value_color = Blockly.Java.valueToCode(block, 'COLOR', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'world.spawnEntityInWorld(ModHelpers.getFirework(world, ' + value_loc_x + ', ' + value_loc_y + ', ' + value_loc_z + ', ' + checkbox_flicker + ', ' + checkbox_trail + ', ' + value_color + ', ' + dropdown_type + ', ' + value_power + '));\n';
  return code;
};





Blockly.Blocks['mcvariable_color_chat'] = {
  init: function() {

    var colour = new Blockly.FieldColour('#AA0000');
    colour.setColours(['#000', '#0000AA', '#00AA00', '#00AAAA', '#AA0000', '#AA00AA', '#FFAA00', '#AAAAAA', '#555555', '#5555FF', '#55FF55', '#55FFFF', '#FF5555', '#FF55FF', '#FFFF55', '#FFFFFF']).setColumns(4);

   this.setOutput(true, 'String');
   this.setColour(290);

    this.appendDummyInput()
        .appendField('Chat Color:')
        .appendField(colour, 'COLOR');

  }
};

Blockly.Java['mcvariable_color_chat'] = function(block) {
  var colour_color = block.getFieldValue('COLOR');
  var code = 'ModHelpers.getChatColorFromHex("' + colour_color + '")';
  return [code, Blockly.Java.ORDER_NONE];
};




Blockly.Blocks['mcvariable_color_fireworks'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcvariable_color_fireworks",
  "message0": "Firework Color: %1",
  "args0": [
    {
      "type": "field_colour",
      "name": "COLOR",
      "colour": "#ff0000"
    }
  ],
  "output": "String",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcvariable_color_fireworks'] = function(block) {
  var colour_color = block.getFieldValue('COLOR');
  var code = '"' + colour_color + '"';
  return [code, Blockly.Java.ORDER_NONE];
};





Blockly.Blocks['mcaction_rename_entity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_rename_entity",
  "message0": "Rename Creature %1 Name: %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_rename_entity'] = function(block) {
  var value_name = Blockly.Java.valueToCode(block, 'NAME', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  'if(variableHolder.entity != null){\n' +
  '    variableHolder.entity.setCustomNameTag(' + value_name + ');\n' +
  '    variableHolder.entity.setAlwaysRenderNameTag(true);\n' +
  '}\n'
  ;
  return code;
};




Blockly.Blocks['mcaction_sethealth_entity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_sethealth_entity",
  "message0": "Set Creature Health %1",
  "args0": [
    {
      "type": "input_value",
      "name": "HEALTH",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_sethealth_entity'] = function(block) {
  var value_health = Blockly.Java.valueToCode(block, 'HEALTH', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'if(variableHolder.entity != null){variableHolder.entity.setHealth(' + value_health + 'f);}\n';
  return code;
};



Blockly.Blocks['mcaction_sethealth_player'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_sethealth_player",
  "message0": "Set Player Health %1",
  "args0": [
    {
      "type": "input_value",
      "name": "HEALTH",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_sethealth_player'] = function(block) {
  var value_health = Blockly.Java.valueToCode(block, 'HEALTH', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'if(player != null){player.setHealth(' + value_health + 'f);}\n';
  return code;
};




Blockly.Blocks['mcentity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcentity",
  "message0": "Minecraft Creature %1 Name: %2 %3 Model: %4 %5 Create Spawn Egg %6 %7 Spawn Egg Primary Color %8 %9 Spawn Egg Secondary Color %10 %11 (NI) Spawn Naturally In World %12 %13 Options: %14 %15",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "Creature Name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "MODEL",
      "options": [
        [
          "Bat",
          "BatNew"
        ],
        [
          "Player",
          "Biped"
        ],
        [
          "Blaze",
          "Blaze"
        ],
        [
          "Boat",
          "Boat"
        ],
        [
          "Chicken",
          "ChickenNew"
        ],
        [
          "Cow",
          "Cow"
        ],
        [
          "Creeper",
          "Creeper"
        ],
        /*[
          "Dragon",
          "Dragon"
        ],*/
        [
          "Enderman",
          "Enderman"
        ],
        [
          "Ghast",
          "Ghast"
        ],
        /*[
          "Horse",
          "Horse"
        ],*/
        [
          "Iron Golem",
          "IronGolemNew"
        ],
        [
          "Leash Knot",
          "LeashKnot"
        ],
        /*[
          "Magma Cube",
          "MagmaCube"
        ],*/
        [
          "Minecart",
          "Minecart"
        ],
        [
          "Ocelot",
          "OcelotNew"
        ],
        [
          "Pig",
          "Pig"
        ],
        /*[
          "Sheep1",
          "Sheep1"
        ],
        [
          "Sheep2",
          "Sheep2"
        ],*/
        [
          "Silverfish",
          "Silverfish"
        ],
        [
          "Skeleton",
          "SkeletonNew"
        ],
        [
          "Slime",
          "Slime"
        ],
        [
          "Snowman",
          "SnowMan"
        ],
        [
          "Spider",
          "Spider"
        ],
        [
          "Squid",
          "Squid"
        ],
        [
          "Villager",
          "Villager"
        ],
        [
          "Witch",
          "Witch"
        ],
        /*[
          "Wither",
          "Wither"
        ],*/
        [
          "Wolf",
          "WolfNew"
        ],
        [
          "Zombie",
          "Zombie"
        ],
        [
          "Zombie Villager",
          "ZombieVillager"
        ]
        
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "MAKE_EGG",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "EGG_P",
      "colour": "#ff0000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "EGG_S",
      "colour": "#33ff33"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "SPAWN_NATURALLY",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "OPTIONS",
      "check": "mcentityoptions"
    }
  ],
  "colour": COLOR_CONSTRUCTOR,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};



Blockly.Java['mcentity'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('NAME'));
  var raw_value_name = block.getFieldValue('NAME');
  var dropdown_model = block.getFieldValue('MODEL');
  var checkbox_make_egg = block.getFieldValue('MAKE_EGG') == 'TRUE';
  var colour_egg_p = block.getFieldValue('EGG_P');
  var colour_egg_s = block.getFieldValue('EGG_S');
  var checkbox_spawn_naturally = block.getFieldValue('SPAWN_NATURALLY') == 'TRUE';
  var statements_options = Blockly.Java.statementToCode(block, 'OPTIONS');

  colour_egg_p = colour_egg_p.replace('#', '0x');
  colour_egg_s = colour_egg_s.replace('#', '0x');

  if(!checkbox_make_egg){
    colour_egg_p = -1;
    colour_egg_s = -1;
  }

  var code = 
  '/*BEGIN:' + value_name + '*/\n' +
  '/*type:entity*/\n' +
  '/*model:'+ dropdown_model + '*/\n' +
  'public static class Mcentity_' + value_name + ' extends EntityCreature {\n' +
  '    public static final String RAW_NAME = "' + raw_value_name + '";\n' +
  '    public static final String NAME = "' + value_name + '";\n' +
  '    public static final boolean SPAWN_NATURALLY = ' + checkbox_spawn_naturally + ';\n' +
  '    public static final int EGG_P = ' + colour_egg_p + ';\n' +
  '    public static final int EGG_S = ' + colour_egg_s + ';\n' +
  '\n' +
  '    public Mcentity_' + value_name + '(World world){\n' +
  '        super(world);\n' +
  '    }\n' +
  '\n' +
  '        ' + statements_options + '\n' +
     

  '}\n' +
  '/*END:' + value_name + '*/\n';

  return code;
};

Blockly.Blocks['mcentityoptions_modelscale'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcentityoptions_modelscale",
  "message0": "Scale Model %1 Scale X: %2 Scale Y: %3 Scale Z: %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "Z",
      "check": "Number"
    }
  ],
  "previousStatement": "mcentityoptions",
  "nextStatement": "mcentityoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcentityoptions_modelscale'] = function(block) {
  var value_x = Blockly.Java.valueToCode(block, 'X', Blockly.Java.ORDER_ATOMIC);
  var value_y = Blockly.Java.valueToCode(block, 'Y', Blockly.Java.ORDER_ATOMIC);
  var value_z = Blockly.Java.valueToCode(block, 'Z', Blockly.Java.ORDER_ATOMIC);
  
  var code = '/*scalex:' + value_x + '*/ /*scaley:' + value_y + '*/ /*scalez:' + value_z + '*/\n';
  return code;
};

Blockly.Blocks['mcentityoptions_modeltranslate'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcentityoptions_modeltranslate",
  "message0": "Translate Model %1 Move X: %2 Move Y: %3 Move Z: %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "Z",
      "check": "Number"
    }
  ],
  "previousStatement": "mcentityoptions",
  "nextStatement": "mcentityoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcentityoptions_modeltranslate'] = function(block) {
  var value_x = Blockly.Java.valueToCode(block, 'X', Blockly.Java.ORDER_ATOMIC);
  var value_y = Blockly.Java.valueToCode(block, 'Y', Blockly.Java.ORDER_ATOMIC);
  var value_z = Blockly.Java.valueToCode(block, 'Z', Blockly.Java.ORDER_ATOMIC);
  
  var code = '/*scalex:' + value_x + '*/ /*scaley:' + value_y + '*/ /*scalez:' + value_z + '*/\n';
  return code;
};

Blockly.Blocks['mcentityoptions_sound_living'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcentityoptions_sound_living",
  "message0": "Living Sound:  %1",
  "args0": [
    {
      "type": "input_value",
      "name": "SOUND",
      "check": "String"
    }
  ],
  "previousStatement": "mcentityoptions",
  "nextStatement": "mcentityoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcentityoptions_sound_living'] = function(block) {
  var value_sound = Blockly.Java.valueToCode(block, 'SOUND', Blockly.Java.ORDER_ATOMIC);
  value_sound = value_sound.replace('(', '');
  value_sound = value_sound.replace(')', '');
  var code = 
  '@Override\n' +
  'protected String getLivingSound() {\n' + 
  '    return ' + value_sound + ';\n' + 
  '}\n';
  return code;
};

Blockly.Blocks['mcentityoptions_sound_death'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcentityoptions_sound_death",
  "message0": "Death Sound:  %1",
  "args0": [
    {
      "type": "input_value",
      "name": "SOUND",
      "check": "String"
    }
  ],
  "previousStatement": "mcentityoptions",
  "nextStatement": "mcentityoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcentityoptions_sound_death'] = function(block) {
  var value_sound = Blockly.Java.valueToCode(block, 'SOUND', Blockly.Java.ORDER_ATOMIC);
  value_sound = value_sound.replace('(', '');
  value_sound = value_sound.replace(')', '');
  var code = 
  '@Override\n' +
  'protected String getDeathSound() {\n' + 
  '    return ' + value_sound + ';\n' + 
  '}\n';
  return code;
};

Blockly.Blocks['mcentityoptions_sound_hurt'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcentityoptions_sound_hurt",
  "message0": "Hurt Sound:  %1",
  "args0": [
    {
      "type": "input_value",
      "name": "SOUND",
      "check": "String"
    }
  ],
  "previousStatement": "mcentityoptions",
  "nextStatement": "mcentityoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcentityoptions_sound_hurt'] = function(block) {
  var value_sound = Blockly.Java.valueToCode(block, 'SOUND', Blockly.Java.ORDER_ATOMIC);
  value_sound = value_sound.replace('(', '');
  value_sound = value_sound.replace(')', '');
  var code = 
  '@Override\n' +
  'protected String getHurtSound() {\n' + 
  '    return ' + value_sound + ';\n' + 
  '}\n';
  return code;
};

Blockly.Blocks['mcentityoptions_sound_splash'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcentityoptions_sound_splash",
  "message0": "Splash Sound:  %1",
  "args0": [
    {
      "type": "input_value",
      "name": "SOUND",
      "check": "String"
    }
  ],
  "previousStatement": "mcentityoptions",
  "nextStatement": "mcentityoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcentityoptions_sound_splash'] = function(block) {
  var value_sound = Blockly.Java.valueToCode(block, 'SOUND', Blockly.Java.ORDER_ATOMIC);
  value_sound = value_sound.replace('(', '');
  value_sound = value_sound.replace(')', '');
  var code = 
  '@Override\n' +
  'protected String getSplashSound() {\n' + 
  '    return ' + value_sound + ';\n' + 
  '}\n';
  return code;
};

Blockly.Blocks['mcentityoptions_sound_swim'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcentityoptions_sound_swim",
  "message0": "Swim Sound:  %1",
  "args0": [
    {
      "type": "input_value",
      "name": "SOUND",
      "check": "String"
    }
  ],
  "previousStatement": "mcentityoptions",
  "nextStatement": "mcentityoptions",
  "colour": COLOR_CONSTRUCTOR_OPTION,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcentityoptions_sound_swim'] = function(block) {
  var value_sound = Blockly.Java.valueToCode(block, 'SOUND', Blockly.Java.ORDER_ATOMIC);
  value_sound = value_sound.replace('(', '');
  value_sound = value_sound.replace(')', '');
  var code = 
  '@Override\n' +
  'protected String getSwimSound() {\n' + 
  '    return ' + value_sound + ';\n' + 
  '}\n';
  return code;
};

Blockly.Blocks['mcaction_taskdelay'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_taskdelay",
  "message0": "Delayed Task %1 Delay  (Seconds): %2 Code To Run %3 %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "DELAY",
      "check": "Number"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "inputsInline": false,
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_taskdelay'] = function(block) {
  var value_delay = Blockly.Java.valueToCode(block, 'DELAY', Blockly.Java.ORDER_ATOMIC);
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  'scheduler.runTaskLater((long)(' + value_delay + '*1000), new Runnable(){\n'+
  '    public void run(){\n'+
  '        ' + statements_code + '\n' + 
  '    }\n' + 
  '});'
  ;
  
  return code;
};


Blockly.Blocks['mccommand'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mccommand",
  "message0": "Custom Command %1 Command:  %2 %3 On Command %4 %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "COMMAND",
      "text": "CustomCommand"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "colour": COLOR_CONSTRUCTOR,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mccommand'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('COMMAND'));
  //var text_command = block.getFieldValue('COMMAND');
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = '/*BEGIN:' + value_name + '*/\n' +
    '/*type:command*/\n' +
    '    public class Mccommand_' + value_name + ' extends AbstractCommand {\n' +
    '           @Override\n' +
    '           public String getCommandName() {\n' +
    '                 return "' + value_name + '";\n' + 
    '           }\n' +
    '\n' +
    '           @Override\n' +
    '           public void run(EntityPlayer player, String[] args) {\n' +
    '                 final VariableHolder variableHolder = new VariableHolder();\n' +
    '                 final World world = player.worldObj;\n' +
    '                 if(world.isRemote){return;}\n' +
    '                 ' + statements_code + '\n' + 
    '           }\n' +
    '    }\n' +
    '/*END:' + value_name + '*/\n'
    ;
  return code;
};



Blockly.Blocks['mcaction_particle'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_particle",
  "message0": "Spawn Particle %1 Particle:  %2 %3 Position X: %4 Position Y: %5 Position Z: %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "PARTICLE",
      "options": [
        [
          "Angry villager",
          "angryVillager"
        ],
        [
          "Bubble",
          "bubble"
        ],
        [
          "Cloud",
          "cloud"
        ],
        [
          "Critical Hit",
          "crit"
        ],
        [
          "Deph Suspend",
          "dephsuspend"
        ],
        [
          "Dripping Lava",
          "dripLava"
        ],
        [
          "Dripping Water",
          "dripWater"
        ],
        [
          "Enchantment Table",
          "enchantmenttable"
        ],
        [
          "Export",
          "explode"
        ],
        [
          "Flame",
          "flame"
        ],
        [
          "Foot Step",
          "footstep"
        ],
        [
          "Happy Villager",
          "happyVillager"
        ],
        [
          "Heart",
          "heart"
        ],
        [
          "Huge Explosion",
          "hugeexplosion"
        ],
        [
          "Instant Spell",
          "instantSpell"
        ],
        [
          "Large Explosion",
          "largeexplode"
        ],
        [
          "Large Smoke",
          "largesmoke"
        ],
        [
          "Lava",
          "lava"
        ],
        [
          "Magic Critical Hit",
          "magicCrit"
        ],
        [
          "Mob Spell",
          "mobSpell"
        ],
        [
          "Mob Spell Ambient",
          "mobSpellAmbient"
        ],
        [
          "Noteblock",
          "note"
        ],
        [
          "Portal",
          "portal"
        ],
        [
          "Red Dust",
          "reddust"
        ],
        [
          "Slime",
          "slime"
        ],
        [
          "Smoke",
          "smoke"
        ],
        [
          "Snowball Poof",
          "snowballpoof"
        ],
        [
          "Snow Shovel",
          "snowshovel"
        ],
        [
          "Spell",
          "spell"
        ],
        [
          "Splash",
          "splash"
        ],
        [
          "Suspended",
          "suspended"
        ],
        [
          "Town Aura",
          "townaura"
        ],
        [
          "Wake",
          "wake"
        ],
        [
          "Witch Magic",
          "witchMagic"
        ],   
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "Z",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};



Blockly.Java['mcaction_particle'] = function(block) {
  var dropdown_particle = block.getFieldValue('PARTICLE');
  var value_x = Blockly.Java.valueToCode(block, 'X', Blockly.Java.ORDER_ATOMIC);
  var value_y = Blockly.Java.valueToCode(block, 'Y', Blockly.Java.ORDER_ATOMIC);
  var value_z = Blockly.Java.valueToCode(block, 'Z', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'world.spawnParticle("' + dropdown_particle + '", ' + value_x + ', ' + value_y + ', ' + value_z + ', 0.0f, 0.0f, 0.0f);\n';
  return code;
};


Blockly.Blocks['mcaction_httprequest'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_httprequest",
  "message0": "HTTP Request %1 URL: %2 %3 Request Type: %4 %5 Url Parameters:  %6 %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "URL",
      "text": "http://example.com/"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "REQUEST_TYPE",
      "options": [
        [
          "Get",
          "GET"
        ],
        [
          "Post",
          "POST"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "ENABLE_PARAMS",
      "checked": false
    },
    {
      "type": "input_value",
      "name": "URL_PARAMS",
      "check": "String"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_httprequest'] = function(block) {
  var text_url = block.getFieldValue('URL');
  var dropdown_request_type = block.getFieldValue('REQUEST_TYPE');
  var checkbox_enable_params = block.getFieldValue('ENABLE_PARAMS') == 'TRUE';
  var value_url_params = Blockly.Java.valueToCode(block, 'URL_PARAMS', Blockly.Java.ORDER_ATOMIC);
  
  if(!checkbox_enable_params){
    value_url_params = null;
  }

  var code = 'JavaHelpers.sendRequest("' + text_url + '", "' + value_url_params + '", "' + dropdown_request_type + '");\n';
  return code;
};


Blockly.Blocks['mcsoundinput'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcsoundinput",
  "message0": "Sound %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "SOUND",
      "options": [
          [ "ambient.cave.cave", "ambient.cave.cave" ],
          [ "ambient.weather.rain", "ambient.weather.rain" ],
          [ "ambient.weather.thunder", "ambient.weather.thunder" ],
          [ "game.player.hurt.fall.big", "game.player.hurt.fall.big" ],
          [ "game.player.hurt.fall.small", "game.player.hurt.fall.small" ],
          [ "game.neutral.hurt.fall.big", "game.neutral.hurt.fall.big" ],
          [ "game.neutral.hurt.fall.small", "game.neutral.hurt.fall.small" ],
          [ "game.hostile.hurt.fall.big", "game.hostile.hurt.fall.big" ],
          [ "game.hostile.hurt.fall.small", "game.hostile.hurt.fall.small" ],
          [ "game.player.hurt", "game.player.hurt" ],
          [ "game.neutral.hurt", "game.neutral.hurt" ],
          [ "game.hostile.hurt", "game.hostile.hurt" ],
          [ "game.player.die", "game.player.die" ],
          [ "game.neutral.die", "game.neutral.die" ],
          [ "game.hostile.die", "game.hostile.die" ],
          [ "dig.cloth", "dig.cloth" ],
          [ "dig.grass", "dig.grass" ],
          [ "dig.gravel", "dig.gravel" ],
          [ "dig.sand", "dig.sand" ],
          [ "dig.snow", "dig.snow" ],
          [ "dig.stone", "dig.stone" ],
          [ "dig.wood", "dig.wood" ],
          [ "fire.fire", "fire.fire" ],
          [ "fire.ignite", "fire.ignite" ],
          [ "fireworks.blast", "fireworks.blast" ],
          [ "fireworks.blast_far", "fireworks.blast_far" ],
          [ "fireworks.largeBlast", "fireworks.largeBlast" ],
          [ "fireworks.largeBlast_far", "fireworks.largeBlast_far" ],
          [ "fireworks.launch", "fireworks.launch" ],
          [ "fireworks.twinkle", "fireworks.twinkle" ],
          [ "fireworks.twinkle_far", "fireworks.twinkle_far" ],
          [ "liquid.lava", "liquid.lava" ],
          [ "liquid.lavapop", "liquid.lavapop" ],
          [ "game.neutral.swim.splash", "game.neutral.swim.splash" ],
          [ "game.player.swim.splash", "game.player.swim.splash" ],
          [ "game.hostile.swim.splash", "game.hostile.swim.splash" ],
          [ "game.player.swim", "game.player.swim" ],
          [ "game.neutral.swim", "game.neutral.swim" ],
          [ "game.hostile.swim", "game.hostile.swim" ],
          [ "liquid.water", "liquid.water" ],
          [ "minecart.base", "minecart.base" ],
          [ "minecart.inside", "minecart.inside" ],
          [ "mob.bat.death", "mob.bat.death" ],
          [ "mob.bat.hurt", "mob.bat.hurt" ],
          [ "mob.bat.idle", "mob.bat.idle" ],
          [ "mob.bat.loop", "mob.bat.loop" ],
          [ "mob.bat.takeoff", "mob.bat.takeoff" ],
          [ "mob.blaze.breathe", "mob.blaze.breathe" ],
          [ "mob.blaze.death", "mob.blaze.death" ],
          [ "mob.blaze.hit", "mob.blaze.hit" ],
          [ "mob.cat.hiss", "mob.cat.hiss" ],
          [ "mob.cat.hitt", "mob.cat.hitt" ],
          [ "mob.cat.meow", "mob.cat.meow" ],
          [ "mob.cat.purr", "mob.cat.purr" ],
          [ "mob.cat.purreow", "mob.cat.purreow" ],
          [ "mob.chicken.hurt", "mob.chicken.hurt" ],
          [ "mob.chicken.plop", "mob.chicken.plop" ],
          [ "mob.chicken.say", "mob.chicken.say" ],
          [ "mob.chicken.step", "mob.chicken.step" ],
          [ "mob.cow.hurt", "mob.cow.hurt" ],
          [ "mob.cow.say", "mob.cow.say" ],
          [ "mob.cow.step", "mob.cow.step" ],
          [ "mob.creeper.death", "mob.creeper.death" ],
          [ "mob.creeper.say", "mob.creeper.say" ],
          [ "mob.enderdragon.end", "mob.enderdragon.end" ],
          [ "mob.enderdragon.growl", "mob.enderdragon.growl" ],
          [ "mob.enderdragon.hit", "mob.enderdragon.hit" ],
          [ "mob.enderdragon.wings", "mob.enderdragon.wings" ],
          [ "mob.endermen.death", "mob.endermen.death" ],
          [ "mob.endermen.hit", "mob.endermen.hit" ],
          [ "mob.endermen.idle", "mob.endermen.idle" ],
          [ "mob.endermen.portal", "mob.endermen.portal" ],
          [ "mob.endermen.scream", "mob.endermen.scream" ],
          [ "mob.endermen.stare", "mob.endermen.stare" ],
          [ "mob.ghast.affectionate_scream", "mob.ghast.affectionate_scream" ],
          [ "mob.ghast.charge", "mob.ghast.charge" ],
          [ "mob.ghast.death", "mob.ghast.death" ],
          [ "mob.ghast.fireball", "mob.ghast.fireball" ],
          [ "mob.ghast.moan", "mob.ghast.moan" ],
          [ "mob.ghast.scream", "mob.ghast.scream" ],
          [ "mob.horse.angry", "mob.horse.angry" ],
          [ "mob.horse.armor", "mob.horse.armor" ],
          [ "mob.horse.breathe", "mob.horse.breathe" ],
          [ "mob.horse.death", "mob.horse.death" ],
          [ "mob.horse.donkey.angry", "mob.horse.donkey.angry" ],
          [ "mob.horse.donkey.death", "mob.horse.donkey.death" ],
          [ "mob.horse.donkey.hit", "mob.horse.donkey.hit" ],
          [ "mob.horse.donkey.idle", "mob.horse.donkey.idle" ],
          [ "mob.horse.gallop", "mob.horse.gallop" ],
          [ "mob.horse.hit", "mob.horse.hit" ],
          [ "mob.horse.idle", "mob.horse.idle" ],
          [ "mob.horse.jump", "mob.horse.jump" ],
          [ "mob.horse.land", "mob.horse.land" ],
          [ "mob.horse.leather", "mob.horse.leather" ],
          [ "mob.horse.skeleton.death", "mob.horse.skeleton.death" ],
          [ "mob.horse.skeleton.hit", "mob.horse.skeleton.hit" ],
          [ "mob.horse.skeleton.idle", "mob.horse.skeleton.idle" ],
          [ "mob.horse.soft", "mob.horse.soft" ],
          [ "mob.horse.wood", "mob.horse.wood" ],
          [ "mob.horse.zombie.death", "mob.horse.zombie.death" ],
          [ "mob.horse.zombie.hit", "mob.horse.zombie.hit" ],
          [ "mob.horse.zombie.idle", "mob.horse.zombie.idle" ],
          [ "mob.irongolem.death", "mob.irongolem.death" ],
          [ "mob.irongolem.hit", "mob.irongolem.hit" ],
          [ "mob.irongolem.throw", "mob.irongolem.throw" ],
          [ "mob.irongolem.walk", "mob.irongolem.walk" ],
          [ "mob.magmacube.big", "mob.magmacube.big" ],
          [ "mob.magmacube.jump", "mob.magmacube.jump" ],
          [ "mob.magmacube.small", "mob.magmacube.small" ],
          [ "mob.pig.death", "mob.pig.death" ],
          [ "mob.pig.say", "mob.pig.say" ],
          [ "mob.pig.step", "mob.pig.step" ],
          [ "mob.sheep.say", "mob.sheep.say" ],
          [ "mob.sheep.shear", "mob.sheep.shear" ],
          [ "mob.sheep.step", "mob.sheep.step" ],
          [ "mob.silverfish.hit", "mob.silverfish.hit" ],
          [ "mob.silverfish.kill", "mob.silverfish.kill" ],
          [ "mob.silverfish.say", "mob.silverfish.say" ],
          [ "mob.silverfish.step", "mob.silverfish.step" ],
          [ "mob.skeleton.death", "mob.skeleton.death" ],
          [ "mob.skeleton.hurt", "mob.skeleton.hurt" ],
          [ "mob.skeleton.say", "mob.skeleton.say" ],
          [ "mob.skeleton.step", "mob.skeleton.step" ],
          [ "mob.slime.attack", "mob.slime.attack" ],
          [ "mob.slime.big", "mob.slime.big" ],
          [ "mob.slime.small", "mob.slime.small" ],
          [ "mob.spider.death", "mob.spider.death" ],
          [ "mob.spider.say", "mob.spider.say" ],
          [ "mob.spider.step", "mob.spider.step" ],
          [ "mob.villager.death", "mob.villager.death" ],
          [ "mob.villager.haggle", "mob.villager.haggle" ],
          [ "mob.villager.hit", "mob.villager.hit" ],
          [ "mob.villager.idle", "mob.villager.idle" ],
          [ "mob.villager.no", "mob.villager.no" ],
          [ "mob.villager.yes", "mob.villager.yes" ],
          [ "mob.wither.death", "mob.wither.death" ],
          [ "mob.wither.hurt", "mob.wither.hurt" ],
          [ "mob.wither.idle", "mob.wither.idle" ],
          [ "mob.wither.shoot", "mob.wither.shoot" ],
          [ "mob.wither.spawn", "mob.wither.spawn" ],
          [ "mob.wolf.bark", "mob.wolf.bark" ],
          [ "mob.wolf.death", "mob.wolf.death" ],
          [ "mob.wolf.growl", "mob.wolf.growl" ],
          [ "mob.wolf.howl", "mob.wolf.howl" ],
          [ "mob.wolf.hurt", "mob.wolf.hurt" ],
          [ "mob.wolf.panting", "mob.wolf.panting" ],
          [ "mob.wolf.shake", "mob.wolf.shake" ],
          [ "mob.wolf.step", "mob.wolf.step" ],
          [ "mob.wolf.whine", "mob.wolf.whine" ],
          [ "mob.zombie.death", "mob.zombie.death" ],
          [ "mob.zombie.hurt", "mob.zombie.hurt" ],
          [ "mob.zombie.infect", "mob.zombie.infect" ],
          [ "mob.zombie.metal", "mob.zombie.metal" ],
          [ "mob.zombie.remedy", "mob.zombie.remedy" ],
          [ "mob.zombie.say", "mob.zombie.say" ],
          [ "mob.zombie.step", "mob.zombie.step" ],
          [ "mob.zombie.unfect", "mob.zombie.unfect" ],
          [ "mob.zombie.wood", "mob.zombie.wood" ],
          [ "mob.zombie.woodbreak", "mob.zombie.woodbreak" ],
          [ "mob.zombiepig.zpig", "mob.zombiepig.zpig" ],
          [ "mob.zombiepig.zpigangry", "mob.zombiepig.zpigangry" ],
          [ "mob.zombiepig.zpigdeath", "mob.zombiepig.zpigdeath" ],
          [ "mob.zombiepig.zpighurt", "mob.zombiepig.zpighurt" ],
          [ "note.bass", "note.bass" ],
          [ "note.bassattack", "note.bassattack" ],
          [ "note.bd", "note.bd" ],
          [ "note.harp", "note.harp" ],
          [ "note.hat", "note.hat" ],
          [ "note.pling", "note.pling" ],
          [ "note.snare", "note.snare" ],
          [ "portal.portal", "portal.portal" ],
          [ "portal.travel", "portal.travel" ],
          [ "portal.trigger", "portal.trigger" ],
          [ "random.anvil_break", "random.anvil_break" ],
          [ "random.anvil_land", "random.anvil_land" ],
          [ "random.anvil_use", "random.anvil_use" ],
          [ "random.bow", "random.bow" ],
          [ "random.bowhit", "random.bowhit" ],
          [ "random.break", "random.break" ],
          [ "random.burp", "random.burp" ],
          [ "random.chestclosed", "random.chestclosed" ],
          [ "random.chestopen", "random.chestopen" ],
          [ "gui.button.press", "gui.button.press" ],
          [ "random.click", "random.click" ],
          [ "random.door_close", "random.door_close" ],
          [ "random.door_open", "random.door_open" ],
          [ "random.drink", "random.drink" ],
          [ "random.eat", "random.eat" ],
          [ "random.explode", "random.explode" ],
          [ "random.fizz", "random.fizz" ],
          [ "game.tnt.primed", "game.tnt.primed" ],
          [ "creeper.primed", "creeper.primed" ],
          [ "dig.glass", "dig.glass" ],
          [ "game.potion.smash", "game.potion.smash" ],
          [ "random.levelup", "random.levelup" ],
          [ "random.orb", "random.orb" ],
          [ "random.pop", "random.pop" ],
          [ "random.splash", "random.splash" ],
          [ "random.successful_hit", "random.successful_hit" ],
          [ "random.wood_click", "random.wood_click" ],
          [ "records.11", "records.11" ],
          [ "records.13", "records.13" ],
          [ "records.blocks", "records.blocks" ],
          [ "records.cat", "records.cat" ],
          [ "records.chirp", "records.chirp" ],
          [ "records.far", "records.far" ],
          [ "records.mall", "records.mall" ],
          [ "records.mellohi", "records.mellohi" ],
          [ "records.stal", "records.stal" ],
          [ "records.strad", "records.strad" ],
          [ "records.wait", "records.wait" ],
          [ "records.ward", "records.ward" ],
          [ "step.cloth", "step.cloth" ],
          [ "step.grass", "step.grass" ],
          [ "step.gravel", "step.gravel" ],
          [ "step.ladder", "step.ladder" ],
          [ "step.sand", "step.sand" ],
          [ "step.snow", "step.snow" ],
          [ "step.stone", "step.stone" ],
          [ "step.wood", "step.wood" ],
          [ "tile.piston.in", "tile.piston.in" ],
          [ "tile.piston.out", "tile.piston.out" ],
          [ "music.menu", "music.menu" ],
          [ "music.game", "music.game" ],
          [ "music.game.creative", "music.game.creative" ],
          [ "music.game.end", "music.game.end" ],
          [ "music.game.end.dragon", "music.game.end.dragon" ],
          [ "music.game.end.credits", "music.game.end.credits" ],
          [ "music.game.nether", "music.game.nether" ] 
      ]
    }
  ],
  "output": "String",
  "colour": COLOR_VARIABLES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcsoundinput'] = function(block) {
  var dropdown_item = block.getFieldValue('SOUND');
  var code = '"' + dropdown_item + '"';
  
  return [code, Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['mcevent_cancel'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_cancel",
  "message0": "Cancel Event",
  "previousStatement": "cancelevent",
  "colour": COLOR_EVENTS,
  "tooltip": "Cancels the event",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_cancel'] = function(block) {
  var code = 'if(event.isCancelable()) {event.setCanceled(true);}else {PLog.warning("Attempted to cancel a uncancelable event!");}\n';
  return code;
};


Blockly.Blocks['mcevent_itempickup'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_itempickup",
  "message0": "Item Pickup Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when any item is about to be picked up by a player",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_itempickup'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:ItemPickupEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void itemPickupEvent(ItemPickupEvent event) {\n' + 
  '    if(event.player != null && !event.player.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.player;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:ItemPickupEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_itemcraft'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_itemcraft",
  "message0": "Item Craft Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a player is about to craft an item",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_itemcraft'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:ItemCraftedEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void itemCraftedEvent(ItemCraftedEvent event) {\n' + 
  '    if(event.player != null && !event.player.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.player;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:ItemCraftedEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_itemsmelt'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_itemcraft",
  "message0": "Item Smelt Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a player is about to smelt an item",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_itemsmelt'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:ItemSmeltedEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void itemSmeltedEvent(ItemSmeltedEvent event) {\n' + 
  '    if(event.player != null && !event.player.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.player;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:ItemSmeltedEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerjoin'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playerjoin",
  "message0": "Player Join Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a new player is about to connect to the server",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerjoin'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:PlayerLoggedInEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void playerLoggedInEvent(PlayerLoggedInEvent event) {\n' + 
  '    if(event.player != null && !event.player.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.player;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:PlayerLoggedInEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerleave'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playerleave",
  "message0": "Player Leave Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a player is about to disconnect from the server",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerleave'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:PlayerLoggedOutEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void playerLoggedOutEvent(PlayerLoggedOutEvent event) {\n' + 
  '    if(event.player != null && !event.player.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.player;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:PlayerLoggedOutEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerrespawn'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playerrespawn",
  "message0": "Player Respawn Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a player died and is now to be re-spawned",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerrespawn'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:PlayerRespawnEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void playerRespawnEvent(PlayerRespawnEvent event) {\n' + 
  '    if(event.player != null && !event.player.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.player;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:PlayerRespawnEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerarrowshoot'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playerarrowshoot",
  "message0": "Player Arrow Shoot Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when the player is about to shoot an arrow",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerarrowshoot'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:ArrowNockEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void arrowNockEvent(ArrowNockEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:ArrowNockEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerattack'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playerattack",
  "message0": "Player Attack Creature Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when the player is about to attack an Creature",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerattack'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:AttackEntityEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void attackEntityEvent(AttackEntityEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         if(event.target instanceof EntityLiving) {variableHolder.entity = (EntityLiving)event.target;}\n' + 
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:AttackEntityEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerbonemeal'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playerbonemeal",
  "message0": "Player Bonemeal Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when the player attempts to use bonemeal on a block",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerbonemeal'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:BonemealEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void bonemealEvent(BonemealEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:BonemealEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerfillbucket'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playerfillbucket",
  "message0": "Player Fill Bucket Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when the player is about to use an empty bucket",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerfillbucket'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:FillBucketEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void fillBucketEvent(FillBucketEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:FillBucketEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playeritembreak'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playeritembreak",
  "message0": "Player Item Break Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when an item is about to be broken by the player, e.g a sword",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playeritembreak'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:PlayerDestroyItemEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void playerDestroyItemEvent(PlayerDestroyItemEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:PlayerDestroyItemEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playeropencontainer'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playeropencontainer",
  "message0": "Player Open Container Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when the player is about to interact with a container, e.g a chest",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playeropencontainer'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:PlayerOpenContainerEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void playerOpenContainerEvent(PlayerOpenContainerEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:PlayerOpenContainerEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerpickxp'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playerpickxp",
  "message0": "Player Pickup XP Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a player collides with an XPOrb on the ground",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerpickxp'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:PlayerPickupXpEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void playerPickupXpEvent(PlayerPickupXpEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:PlayerPickupXpEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playersleep'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playersleep",
  "message0": "Player Sleep Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a player attempts to sleep in a bed",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playersleep'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:PlayerSleepInBedEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void playerSleepInBedEvent(PlayerSleepInBedEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         final int x = event.x;\n' + 
  '         final int y = event.y;\n' + 
  '         final int z = event.z;\n' + 
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:PlayerSleepInBedEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_playerhoe'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_playersleep",
  "message0": "Player Hoe Dirt Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a player attempts to use a hoe on a block",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_playerhoe'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:UseHoeEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void useHoeEvent(UseHoeEvent event) {\n' + 
  '    if(event.entityPlayer != null && !event.entityPlayer.worldObj.isRemote) {\n' + 
  '         final EntityPlayer player = event.entityPlayer;\n' + 
  '         final World world = player.worldObj;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         final int x = event.x;\n' + 
  '         final int y = event.y;\n' + 
  '         final int z = event.z;\n' + 
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:UseHoeEvent*/\n';
  return code;
};


Blockly.Blocks['mcevent_treegen'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_treegen",
  "message0": "Sapling Grow Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a sapling grows a tree",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_treegen'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:SaplingGrowTreeEvent*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void saplingGrowTreeEvent(SaplingGrowTreeEvent event) {\n' + 
  '    if(!event.world.isRemote) {\n' + 
  '         final EntityPlayer player = null;\n' + 
  '         final World world = event.world;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         final int x = event.x;\n' + 
  '         final int y = event.y;\n' + 
  '         final int z = event.z;\n' + 
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:SaplingGrowTreeEvent*/\n';
  return code;
};

Blockly.Blocks['mcevent_noteblock_play'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_noteblock_play",
  "message0": "Note Block Play Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a Noteblock plays its note",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_noteblock_play'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:NoteBlockEventPlay*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void noteBlockEventPlay(NoteBlockEvent.Play event) {\n' + 
  '    if(!event.world.isRemote) {\n' + 
  '         final EntityPlayer player = null;\n' + 
  '         final World world = event.world;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         final int x = event.x;\n' + 
  '         final int y = event.y;\n' + 
  '         final int z = event.z;\n' + 
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:NoteBlockEventPlay*/\n';
  return code;
};

Blockly.Blocks['mcevent_noteblock_change'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcevent_noteblock_change",
  "message0": "Note Block Change Event %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": [
        "action",
        "cancelevent"
      ]
    }
  ],
  "colour": COLOR_EVENTS,
  "tooltip": "Fired when a Noteblock is changed, e.g the pitch altered",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcevent_noteblock_change'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '/*BEGIN:NoteBlockEventChange*/\n' +
  '/*type:event*/\n' + 
  '@SubscribeEvent\n' +
  'public void noteBlockEventChange(NoteBlockEvent.Change event) {\n' + 
  '    if(!event.world.isRemote) {\n' + 
  '         final EntityPlayer player = null;\n' + 
  '         final World world = event.world;\n' + 
  '         final VariableHolder variableHolder = new VariableHolder();\n' +
  '         final int x = event.x;\n' + 
  '         final int y = event.y;\n' + 
  '         final int z = event.z;\n' + 
  '         ' + statements_code + '\n' + 
  '     }\n' + 
  '}\n' +
  '/*END:NoteBlockEventChange*/\n';
  return code;
};


Blockly.Blocks['mcrecipe_crafting_shaped'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcrecipe_crafting_shaped",
  "message0": "Shaped Crafting Recipe %1 Top Left: %2 Top Center: %3 Top Right: %4 Middle Left: %5 Middle Center: %6 Middle Right: %7 Bottom Left: %8 Bottom Center: %9 Bottom Right: %10 Result: %11",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ITEM1",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM2",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM3",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM4",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM5",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM6",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM7",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM8",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM9",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEMR",
      "check": "mciteminput"
    },
    
  ],
  "colour": COLOR_RECIPES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcrecipe_crafting_shaped'] = function(block) {
  var value_tl = Blockly.Java.valueToCode(block, 'ITEM1', Blockly.Java.ORDER_ATOMIC);
  var value_tc = Blockly.Java.valueToCode(block, 'ITEM2', Blockly.Java.ORDER_ATOMIC);
  var value_tr = Blockly.Java.valueToCode(block, 'ITEM3', Blockly.Java.ORDER_ATOMIC);
  var value_ml = Blockly.Java.valueToCode(block, 'ITEM4', Blockly.Java.ORDER_ATOMIC);
  var value_mc = Blockly.Java.valueToCode(block, 'ITEM5', Blockly.Java.ORDER_ATOMIC);
  var value_mr = Blockly.Java.valueToCode(block, 'ITEM6', Blockly.Java.ORDER_ATOMIC);
  var value_bl = Blockly.Java.valueToCode(block, 'ITEM7', Blockly.Java.ORDER_ATOMIC);
  var value_bc = Blockly.Java.valueToCode(block, 'ITEM8', Blockly.Java.ORDER_ATOMIC);
  var value_br = Blockly.Java.valueToCode(block, 'ITEM9', Blockly.Java.ORDER_ATOMIC);
  var value_r = Blockly.Java.valueToCode(block, 'ITEMR', Blockly.Java.ORDER_ATOMIC);
  
  var craftString = '';

  craftString += '"' + ((value_tl == "") ? ' ' : 'A') + ((value_tc == "") ? ' ' : 'B') + ((value_tr == "") ? ' ' : 'C') + '", ';
  craftString += '"' + ((value_ml == "") ? ' ' : 'D') + ((value_mc == "") ? ' ' : 'E') + ((value_mr == "") ? ' ' : 'F') + '", ';
  craftString += '"' + ((value_bl == "") ? ' ' : 'G') + ((value_bc == "") ? ' ' : 'H') + ((value_br == "") ? ' ' : 'I') + '"';

  if (value_tl != "") { craftString += ', \'A\', ' + value_tl; }
  if (value_tc != "") { craftString += ', \'B\', ' + value_tc; }
  if (value_tr != "") { craftString += ', \'C\', ' + value_tr; }
  if (value_ml != "") { craftString += ', \'D\', ' + value_ml; }
  if (value_mc != "") { craftString += ', \'E\', ' + value_mc; }
  if (value_mr != "") { craftString += ', \'F\', ' + value_mr; }
  if (value_bl != "") { craftString += ', \'G\', ' + value_bl; }
  if (value_bc != "") { craftString += ', \'H\', ' + value_bc; }
  if (value_br != "") { craftString += ', \'I\', ' + value_br; }

  var code = '/*BEGIN:Recipes*/\n' +
  '/*type:recipe*/\n' +
  'GameRegistry.addRecipe(new ItemStack' + value_r + ', ' +  craftString + ');\n' + 
  '/*END:Recipes*/\n';
  return code;
};



Blockly.Blocks['mcrecipe_crafting_shapeless'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcrecipe_crafting_shapeless",
  "message0": "Shapeless Crafting Recipe %1 Material 1: %2 Material 2: %3 Material 3: %4 Material 4: %5 Material 5: %6 Material 6: %7 Material 7: %8 Material 8: %9 Material 9: %10 Result: %11",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ITEM1",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM2",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM3",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM4",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM5",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM6",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM7",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM8",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEM9",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEMR",
      "check": "mciteminput"
    },
    
  ],
  "colour": COLOR_RECIPES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcrecipe_crafting_shapeless'] = function(block) {
  var value_tl = Blockly.Java.valueToCode(block, 'ITEM1', Blockly.Java.ORDER_ATOMIC);
  var value_tc = Blockly.Java.valueToCode(block, 'ITEM2', Blockly.Java.ORDER_ATOMIC);
  var value_tr = Blockly.Java.valueToCode(block, 'ITEM3', Blockly.Java.ORDER_ATOMIC);
  var value_ml = Blockly.Java.valueToCode(block, 'ITEM4', Blockly.Java.ORDER_ATOMIC);
  var value_mc = Blockly.Java.valueToCode(block, 'ITEM5', Blockly.Java.ORDER_ATOMIC);
  var value_mr = Blockly.Java.valueToCode(block, 'ITEM6', Blockly.Java.ORDER_ATOMIC);
  var value_bl = Blockly.Java.valueToCode(block, 'ITEM7', Blockly.Java.ORDER_ATOMIC);
  var value_bc = Blockly.Java.valueToCode(block, 'ITEM8', Blockly.Java.ORDER_ATOMIC);
  var value_br = Blockly.Java.valueToCode(block, 'ITEM9', Blockly.Java.ORDER_ATOMIC);
  var value_r = Blockly.Java.valueToCode(block, 'ITEMR', Blockly.Java.ORDER_ATOMIC);
  


  var craftString = '';

  if (value_tl != "") { craftString += ', ' + value_tl; }
  if (value_tc != "") { craftString += ', ' + value_tc; }
  if (value_tr != "") { craftString += ', ' + value_tr; }
  if (value_ml != "") { craftString += ', ' + value_ml; }
  if (value_mc != "") { craftString += ', ' + value_mc; }
  if (value_mr != "") { craftString += ', ' + value_mr; }
  if (value_bl != "") { craftString += ', ' + value_bl; }
  if (value_bc != "") { craftString += ', ' + value_bc; }
  if (value_br != "") { craftString += ', ' + value_br; }

  var code = '/*BEGIN:Recipes*/\n' +
  '/*type:recipe*/\n' +
  'GameRegistry.addShapelessRecipe(new ItemStack' + value_r + craftString + ');\n' + 
  '/*END:Recipes*/\n';
  return code;
};


Blockly.Blocks['mcrecipe_smelting'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcrecipe_smelting",
  "message0": "Furnace Recipe %1 Input: %2 Output: %3",
  "args0": [
    {
      "type": "input_dummy"
    }, 
    {
      "type": "input_value",
      "name": "ITEMI",
      "check": "mciteminput"
    },
    {
      "type": "input_value",
      "name": "ITEMO",
      "check": "mciteminput"
    },
    
  ],
  "colour": COLOR_RECIPES,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcrecipe_smelting'] = function(block) {
  var value_itemi = Blockly.Java.valueToCode(block, 'ITEMI', Blockly.Java.ORDER_ATOMIC);
  var value_itemo = Blockly.Java.valueToCode(block, 'ITEMO', Blockly.Java.ORDER_ATOMIC);

  var code = 
  '/*BEGIN:Recipes*/\n' +
  '/*type:recipe*/\n' +
  'GameRegistry.addSmelting(' + value_itemi + ', new ItemStack' + value_itemo + ', 0.35f);\n' + 
  '/*END:Recipes*/\n';
  return code;
};


Blockly.Blocks['mcaction_fire_entity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_fire_entity",
  "message0": "Set Entity On Fire %1 Seconds: %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "SECONDS",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": COLOR_ACTIONS,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_fire_entity'] = function(block) {
  var value_seconds = Blockly.Java.valueToCode(block, 'SECONDS', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'if(variableHolder.entity != null){entity.setFire((int)' + value_seconds + ');}\n';
  return code;
};