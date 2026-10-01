/**
 * Web Audio API synthesizer for Solo Leveling System Sound Effects
 * High performance, zero latency, works completely offline without network dependencies.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private soundEnabled: boolean = true;
  private bgmEnabled: boolean = true;
  private volume: number = 0.8;
  private bgmVolume: number = 0.35;
  private currentBgmMode: 'ambient' | 'epic' | 'off' = 'off';
  private bgmLoopTimer: number | null = null;
  private bgmActiveNodes: Array<AudioNode> = [];

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.bgmEnabled ? this.bgmVolume : 0, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setBgmVolume(vol: number) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain && this.ctx && this.bgmEnabled) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setBgmEnabled(enabled: boolean) {
    this.bgmEnabled = enabled;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(enabled ? this.bgmVolume : 0, this.ctx.currentTime);
    }
    if (!enabled) {
      this.stopBgm();
    } else if (this.currentBgmMode !== 'off') {
      const mode = this.currentBgmMode;
      this.currentBgmMode = 'off';
      this.setBgmMode(mode);
    }
  }

  public getBgmEnabled(): boolean {
    return this.bgmEnabled;
  }

  public getBgmMode(): 'ambient' | 'epic' | 'off' {
    return this.currentBgmMode;
  }

  // ==========================================
  // PROCEDURAL BGM ENGINE: AMBIENT & EPIC ORCHESTRAL
  // ==========================================

  public setBgmMode(mode: 'ambient' | 'epic') {
    if (!this.bgmEnabled) {
      this.currentBgmMode = mode;
      return;
    }
    if (this.currentBgmMode === mode) return;

    this.stopBgmNodes();
    this.currentBgmMode = mode;
    this.initContext();

    if (mode === 'epic') {
      this.playEpicOrchestralLoop();
    } else {
      this.playAmbientLoop();
    }
  }

  public stopBgm() {
    this.stopBgmNodes();
    this.currentBgmMode = 'off';
  }

  private stopBgmNodes() {
    if (this.bgmLoopTimer) {
      window.clearInterval(this.bgmLoopTimer);
      this.bgmLoopTimer = null;
    }
    this.bgmActiveNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignore already stopped nodes
      }
    });
    this.bgmActiveNodes = [];
  }

  // 1. AMBIENT CALM THEME (Normal System Tabs)
  // Tranquil ethereal crystalline drone & soft mysterious harmonic intervals
  private playAmbientLoop() {
    if (!this.ctx || !this.bgmGain || !this.bgmEnabled) return;

    const playBar = () => {
      if (!this.ctx || !this.bgmGain || this.currentBgmMode !== 'ambient') return;
      const t = this.ctx.currentTime;
      const chords = [
        [220, 261.63, 329.63, 440], // A minor
        [174.61, 220, 261.63, 349.23], // F major
        [196, 246.94, 293.66, 392], // G major
        [164.81, 196, 246.94, 329.63], // E minor
      ];
      const randomChord = chords[Math.floor(Math.random() * chords.length)];

      randomChord.forEach((freq, i) => {
        if (!this.ctx || !this.bgmGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, t);
        // Subtle slow pitch vibrato for ethereal feeling
        osc.frequency.linearRampToValueAtTime(freq * 1.004, t + 3.0);
        osc.frequency.linearRampToValueAtTime(freq, t + 6.0);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.08 / (i + 1), t + 1.8);
        gain.gain.linearRampToValueAtTime(0.001, t + 6.0);

        osc.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(t);
        osc.stop(t + 6.2);
        this.bgmActiveNodes.push(osc, gain);
      });

      // Crystal chime bell in high register
      const chimeFreqs = [880, 1046.5, 1318.5, 1567.98, 1760];
      const chimeFreq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(chimeFreq, t + 1.2);

      chimeGain.gain.setValueAtTime(0.001, t + 1.2);
      chimeGain.gain.exponentialRampToValueAtTime(0.035, t + 1.4);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, t + 4.2);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.bgmGain);

      chimeOsc.start(t + 1.2);
      chimeOsc.stop(t + 4.4);
      this.bgmActiveNodes.push(chimeOsc, chimeGain);
    };

    playBar();
    this.bgmLoopTimer = window.setInterval(playBar, 5800);
  }

  // 2. EPIC ORCHESTRAL THEME (Dungeon Raid & Boss Arena)
  // Driving taiko drums, low brass war horn stabs, rapid pulsing 16th bassline, epic battle strings
  private playEpicOrchestralLoop() {
    if (!this.ctx || !this.bgmGain || !this.bgmEnabled) return;

    let step = 0;
    const tempo = 124; // BPM
    const eighthNoteSec = (60 / tempo) / 2; // ~0.24s

    const playBeat = () => {
      if (!this.ctx || !this.bgmGain || this.currentBgmMode !== 'epic') return;
      const t = this.ctx.currentTime;
      const beatInMeasure = step % 8;

      // 1. Timpani / Taiko Bass Drum on beats 0, 3, 4, 6 (Solo Leveling battle groove)
      if (beatInMeasure === 0 || beatInMeasure === 3 || beatInMeasure === 4 || beatInMeasure === 6) {
        const drumOsc = this.ctx.createOscillator();
        const drumGain = this.ctx.createGain();

        drumOsc.type = 'sine';
        drumOsc.frequency.setValueAtTime(140, t);
        drumOsc.frequency.exponentialRampToValueAtTime(45, t + 0.18);

        drumGain.gain.setValueAtTime(0.28, t);
        drumGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        drumOsc.connect(drumGain);
        drumGain.connect(this.bgmGain);

        drumOsc.start(t);
        drumOsc.stop(t + 0.28);
        this.bgmActiveNodes.push(drumOsc, drumGain);
      }

      // 2. Driving Bass Synth Arpeggio (D minor scale: D2, F2, G2, A2)
      const bassNotes = [73.42, 73.42, 87.31, 73.42, 98.0, 87.31, 110.0, 98.0];
      const bassFreq = bassNotes[beatInMeasure];
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(bassFreq, t);

      bassGain.gain.setValueAtTime(0.09, t);
      bassGain.gain.exponentialRampToValueAtTime(0.005, t + eighthNoteSec * 0.9);

      bassOsc.connect(bassGain);
      bassGain.connect(this.bgmGain);

      bassOsc.start(t);
      bassOsc.stop(t + eighthNoteSec);
      this.bgmActiveNodes.push(bassOsc, bassGain);

      // 3. Brass War Horn Accent on measure start (beat 0)
      if (beatInMeasure === 0) {
        const hornOsc1 = this.ctx.createOscillator();
        const hornOsc2 = this.ctx.createOscillator();
        const hornGain = this.ctx.createGain();

        hornOsc1.type = 'sawtooth';
        hornOsc2.type = 'triangle';
        // Low D3 / A3 power chord
        hornOsc1.frequency.setValueAtTime(146.83, t);
        hornOsc2.frequency.setValueAtTime(220.0, t);

        hornGain.gain.setValueAtTime(0.001, t);
        hornGain.gain.linearRampToValueAtTime(0.12, t + 0.08);
        hornGain.gain.exponentialRampToValueAtTime(0.001, t + eighthNoteSec * 3.5);

        hornOsc1.connect(hornGain);
        hornOsc2.connect(hornGain);
        hornGain.connect(this.bgmGain);

        hornOsc1.start(t);
        hornOsc2.start(t);
        hornOsc1.stop(t + eighthNoteSec * 3.8);
        hornOsc2.stop(t + eighthNoteSec * 3.8);
        this.bgmActiveNodes.push(hornOsc1, hornOsc2, hornGain);
      }

      // 4. Heroic High Strings Staccato on off-beats
      if (beatInMeasure === 2 || beatInMeasure === 5 || beatInMeasure === 7) {
        const stringOsc = this.ctx.createOscillator();
        const stringGain = this.ctx.createGain();

        const stringNotes = [587.33, 698.46, 880.0]; // D5, F5, A5
        stringOsc.type = 'sawtooth';
        stringOsc.frequency.setValueAtTime(stringNotes[(step % 3)], t);

        stringGain.gain.setValueAtTime(0.045, t);
        stringGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        stringOsc.connect(stringGain);
        stringGain.connect(this.bgmGain);

        stringOsc.start(t);
        stringOsc.stop(t + 0.14);
        this.bgmActiveNodes.push(stringOsc, stringGain);
      }

      step++;
    };

    playBeat();
    this.bgmLoopTimer = window.setInterval(playBeat, eighthNoteSec * 1000);
  }

  // Visual Mana Burn SFX: Resonant Ethereal Energy Surge & Shimmer
  public playManaBurnSound() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Layer 1: Resonant deep energy surge
    const surgeOsc = this.ctx.createOscillator();
    const surgeGain = this.ctx.createGain();

    surgeOsc.type = 'sawtooth';
    surgeOsc.frequency.setValueAtTime(160, t);
    surgeOsc.frequency.exponentialRampToValueAtTime(540, t + 0.35);

    surgeGain.gain.setValueAtTime(0.25 * this.volume, t);
    surgeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    surgeOsc.connect(surgeGain);
    surgeGain.connect(this.masterGain);

    surgeOsc.start(t);
    surgeOsc.stop(t + 0.42);

    // Layer 2: High cyan electric sparkle shimmer
    const freqs = [880, 1174.66, 1760, 2349.32];
    freqs.forEach((f, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const shimmer = this.ctx.createOscillator();
      const sGain = this.ctx.createGain();

      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(f, t + idx * 0.05);

      sGain.gain.setValueAtTime(0.08 * this.volume, t + idx * 0.05);
      sGain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.25);

      shimmer.connect(sGain);
      sGain.connect(this.masterGain);

      shimmer.start(t + idx * 0.05);
      shimmer.stop(t + idx * 0.05 + 0.28);
    });
  }

  // Monster Evade / Dodge whoosh sound
  public playEvadeSound() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.18);

    gain.gain.setValueAtTime(0.3 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  // Monster Multi-Hit Combo Sound
  public playMonsterComboHit(comboIndex: number = 1) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const pitches = [140, 210, 320];
    const pitch = pitches[Math.min(comboIndex - 1, pitches.length - 1)] || 180;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.12);

    const gainVal = comboIndex >= 3 ? 0.45 : 0.3;
    gain.gain.setValueAtTime(gainVal * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  // System UI Click / Tap
  public playClick() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(1800, t + 0.04);

    gain.gain.setValueAtTime(0.2 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  // System Notification / Quest Prompt Tone (Signature double crystal ping)
  public playSystemNotification() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const freqs = [880, 1320, 1760];

    freqs.forEach((f, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t + delay);

      gain.gain.setValueAtTime(0, t + delay);
      gain.gain.linearRampToValueAtTime(0.25 * this.volume, t + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + delay);
      osc.stop(t + delay + 0.45);
    });
  }

  // Stat point allocation
  public playStatAllocated() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.12);

    gain.gain.setValueAtTime(0.3 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  // Level Up / Big Achievement Fanfare
  public playLevelUp() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = t + i * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.35 * this.volume, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + 0.65);
    });
  }

  // Dagger Slash (Rapid swoosh with metallic edge)
  public playDaggerSlash() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    // Noise buffer for whoosh
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, t);
    filter.frequency.exponentialRampToValueAtTime(600, t + 0.12);
    filter.Q.setValueAtTime(3, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4 * this.volume, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    whiteNoise.start(t);
    whiteNoise.stop(t + 0.15);

    // Blade ring tone
    const osc = this.ctx.createOscillator();
    const ringGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2400, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);

    ringGain.gain.setValueAtTime(0.15 * this.volume, t);
    ringGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(ringGain);
    ringGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  // Venom Strike (Sizzling poison burst)
  public playVenomStrike() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.25);

    gain.gain.setValueAtTime(0.35 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.26);
  }

  // Stealth (Whoosh fading into eerie silence)
  public playStealth() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.35);

    gain.gain.setValueAtTime(0.2 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.36);
  }

  // Ruler's Authority (Telekinetic gravity slam resonance)
  public playRulersAuthority() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.linearRampToValueAtTime(60, t + 0.4);

    gain.gain.setValueAtTime(0.6 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  // ARISE - Shadow Extraction (The signature ominous, ethereal monarch roar)
  public playArise() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    // Sub rumble
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(70, t);
    subOsc.frequency.exponentialRampToValueAtTime(35, t + 0.8);

    subGain.gain.setValueAtTime(0.5 * this.volume, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(t);
    subOsc.stop(t + 0.9);

    // Ethereal purple aura shimmer
    const chordNotes = [220, 277.18, 329.63, 440];
    chordNotes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + delay + 0.7);

      gain.gain.setValueAtTime(0, t + delay);
      gain.gain.linearRampToValueAtTime(0.2 * this.volume, t + delay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.7);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + delay);
      osc.stop(t + delay + 0.75);
    });
  }

  // Boss Hit / Impact
  public playBossHit() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.2);

    gain.gain.setValueAtTime(0.4 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  // Penalty Zone Siren Alarm
  public playPenaltyWarning() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.linearRampToValueAtTime(500, t + 0.25);
    osc.frequency.linearRampToValueAtTime(800, t + 0.5);

    gain.gain.setValueAtTime(0.3 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.6);
  }

  // Potion Drinking
  public playPotion() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.15);

    gain.gain.setValueAtTime(0.25 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Turn-based: Player Turn chime
  public playPlayerTurnChime() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    [1046.5, 1318.5].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + delay);

      gain.gain.setValueAtTime(0, t + delay);
      gain.gain.linearRampToValueAtTime(0.3 * this.volume, t + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + delay);
      osc.stop(t + delay + 0.35);
    });
  }

  // Turn-based: Boss Turn Warning (low dread horn)
  public playBossTurnWarning() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.35);

    gain.gain.setValueAtTime(0.35 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.38);
  }

  // Boss Roar / Monster Attack Growl
  public playBossRoar() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(90, t + 0.4);

    gain.gain.setValueAtTime(0.4 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  // Player Guard / Mana Shield
  public playGuardShield() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.linearRampToValueAtTime(880, t + 0.2);

    gain.gain.setValueAtTime(0.3 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.35);
  }

  // Monster Hit (Fleshy impact + bone hit)
  public playMonsterHit() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.15);

    gain.gain.setValueAtTime(0.4 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // Convenient Aliases for Combat & Dungeon Actions
  public playSlash() {
    this.playDaggerSlash();
  }

  public playCrit() {
    this.playLevelUp();
  }

  public playFatigueAlert() {
    this.playPenaltyWarning();
  }

  public playVenom() {
    this.playVenomStrike();
  }

  public playAuthority() {
    this.playRulersAuthority();
  }

  public playGuardSound() {
    this.playGuardShield();
  }

  public playHit() {
    this.playMonsterHit();
  }

  public playVictoryFanfare() {
    this.playLevelUp();
  }
}

export const soundFx = new SoundSynthesizer();
