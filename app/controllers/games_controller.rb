class GamesController < ApplicationController

  def new
    @game = Game.new
  end


  def create
    @game = Game.new
    @game.create_player
    @game.start_time = @game.created_at
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

end
