class GamesController < ApplicationController

  def new
    @game = Game.new
    @images = Image.all
  end


  def create
    @game = Game.new
    @game.create_player(:name => 'Anonymous')
    @game.start_time = Time.now
    @game.image = Image.first

    if @game.save
      redirect_to @game
    else
      render :new
    end

  end


  def show
    @game = Game.find(params[:id])

    game_data = @game.to_json(:include => [:characters, :tags])

    respond_to do |format|
      format.html { render :show }
      format.json { render :json => game_data, :status => 200 }
    end
  end


  # To mark end of Game
  def update
    @game = Game.find(params[:id])

    if @game.check_tags && @game.update(:end_time => Time.now)
      game_data = @game.to_json(:include => [:characters, :tags])

      respond_to do |format|
        format.json { render :json => game_data, :status => 200 }
      end

    else
      respond_to do |format|
                                        # shared js to say 'sorry you lose'
        format.json { render :nothing => true, :status => :unprocessable_entity }
      end

    end
  end


  # Get high scores
  def index
    @fastest_times = Game.fastest_times(params[:image_id])

    respond_to do |format|
      format.json { render :json => @fastest_times, :status => 200 }
    end
  end


end
