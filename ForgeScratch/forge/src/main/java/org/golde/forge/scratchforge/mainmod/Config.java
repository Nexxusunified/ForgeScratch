package org.golde.forge.scratchforge.mainmod;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

import org.golde.forge.scratchforge.base.helpers.PLog;

public class Config {

	private static boolean multiplayer = true;
	private static boolean multiplayerLimited = false;
	private static boolean tutorial = false;
	private static int tutorialPlace = -1;
	
	private static Properties prop = new Properties();
	private static InputStream input = null;
	private static OutputStream output = null;
	private static File configDir;
	
	public static void load(File theconfigDir) {
		configDir = theconfigDir;
		try {
			multiplayer = Boolean.parseBoolean(get("CLIENT_MULTIPLAYER_ENABLED"));
			multiplayerLimited = Boolean.parseBoolean(get("CLIENT_MULTIPLAYER_LIMITED"));
			tutorial = Boolean.parseBoolean(get("TUTORIAL"));
			tutorialPlace = Integer.parseInt(get("TUTORIALPLACE"));
		}
		catch(Exception e) {
			PLog.error(e, "Failed to load config!");
		}
	}
	
	private static String get(String setting) {
		try {
			input = new FileInputStream(new File(configDir, "config.properties"));
			prop.load(input);
			String result = prop.getProperty(setting);
			input.close();
			return result;
		}
		catch(Exception e) {
			PLog.error(e, "Failed to read setting " + setting + "!");
			return "0";
		}
	}
	
	private static void setString(String setting, String to) {
		try {
			output = new FileOutputStream("config.properties");
			prop.setProperty(setting.toUpperCase(), to);
			prop.store(output, null);
			output.close();
		}
		catch(Exception e) {
			PLog.error(e, "Failed to set " + setting.toUpperCase() + " to " + to + "!");
		}
	}
	
	public static void updateTutorialPlace() {
		setString("TUTORIALPLACE", "" + (Integer.parseInt(get("TUTORIALPLACE")) + 1));
	}
	
	public static boolean isMultiplayerButtonEnabled() {
		return multiplayer;
	}
	
	public static boolean isMultiplayerLimitedToLan() {
		return multiplayerLimited;
	}
	
	public static boolean isTutorial() {
		return tutorial;
	}
	
	public static int getTutorialPlace() {
		return tutorialPlace;
	}
	
}
